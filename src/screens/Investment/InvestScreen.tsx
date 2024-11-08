import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyBox from './CurrencyBox';
import InvestmentInput from './InvestmentInput';

interface Transaction {
  type: 'buy' | 'sell';
  rate: number;
  amount: number;
  date: string;
}

interface CurrencyData {
  transactions: Transaction[];
  totalAmount: number;
  averageRate: number;
}

interface InvestmentData {
  dollar?: CurrencyData;
  euro?: CurrencyData;
  gold?: CurrencyData;
}

const InvestScreen: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [dollarRate, setDollarRate] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [euroRate, setEuroRate] = useState('');
  const [euroAmount, setEuroAmount] = useState('');
  const [goldRate, setGoldRate] = useState('');
  const [goldAmount, setGoldAmount] = useState('');

  const handleCurrencyPress = (currency: string) => setSelectedCurrency(currency);

  const calculateTotalAmount = (transactions: Transaction[]): number => {
    return transactions.reduce((sum, t) => {
      // Alış işleminde miktar eklenir, satış işleminde çıkarılır
      if (t.type === 'buy') {
        return sum + t.amount;
      } else {
        return sum - t.amount;
      }
    }, 0);
  };

  const saveTransaction = async (currency: 'dollar' | 'euro' | 'gold', rate: string, amount: string) => {
    if (rate && amount) {
      try {
        const currentData = await AsyncStorage.getItem('investData');
        const parsedData: InvestmentData = currentData ? JSON.parse(currentData) : {};
        
        const currentCurrencyData = parsedData[currency] || { transactions: [], totalAmount: 0, averageRate: 0 };
        const transactionAmount = parseFloat(amount);
        
        // Satış işlemi için miktar kontrolü
        if (transactionType === 'sell') {
          const currentTotal = calculateTotalAmount(currentCurrencyData.transactions);
          if (transactionAmount > currentTotal) {
            Alert.alert('Hata', `Yetersiz ${currency} bakiyesi. Mevcut: ${currentTotal.toFixed(2)}`);
            return;
          }
        }

        const newTransaction: Transaction = {
          type: transactionType,
          rate: parseFloat(rate),
          amount: transactionAmount,
          date: new Date().toISOString(),
        };

        const updatedTransactions = [...currentCurrencyData.transactions, newTransaction];
        const totalAmount = calculateTotalAmount(updatedTransactions);

        // Ortalama maliyet hesaplama (sadece alış işlemleri için)
        const buyTransactions = updatedTransactions.filter(t => t.type === 'buy');
        const totalBuyAmount = buyTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = buyTransactions.reduce((sum, t) => sum + t.rate * t.amount, 0);
        const averageRate = totalBuyAmount > 0 ? weightedSum / totalBuyAmount : 0;

        const updatedCurrencyData: CurrencyData = {
          transactions: updatedTransactions,
          totalAmount,
          averageRate
        };

        const newData: InvestmentData = { ...parsedData, [currency]: updatedCurrencyData };

        await AsyncStorage.setItem('investData', JSON.stringify(newData));
        
        const actionType = transactionType === 'buy' ? 'Alış' : 'Satış';
        Alert.alert(`${currency} ${actionType} İşlemi Kaydedildi`,
          `İşlem Tipi: ${actionType}\n` +
          `İşlem Kuru: ${rate}\n` +
          `İşlem Miktarı: ${amount}\n` +
          `Toplam Miktar: ${totalAmount.toFixed(2)}\n` +
          `Ortalama Maliyet: ${averageRate.toFixed(2)}`
        );

        // İşlem sonrası input alanlarını temizle
        switch(currency) {
          case 'dollar':
            setDollarRate('');
            setDollarAmount('');
            break;
          case 'euro':
            setEuroRate('');
            setEuroAmount('');
            break;
          case 'gold':
            setGoldRate('');
            setGoldAmount('');
            break;
        }
        
      } catch (error) {
        console.error('Kayıt hatası:', error);
        Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yatırım Ekranı</Text>

      <View style={styles.typeSelector}>
        <Text
          style={[
            styles.typeButton,
            transactionType === 'buy' && styles.selectedType
          ]}
          onPress={() => setTransactionType('buy')}
        >
          Alış
        </Text>
        <Text
          style={[
            styles.typeButton,
            transactionType === 'sell' && styles.selectedType
          ]}
          onPress={() => setTransactionType('sell')}
        >
          Satış
        </Text>
      </View>

      <View style={styles.currencyBoxContainer}>
        <CurrencyBox label="Dolar" onPress={() => handleCurrencyPress('dollar')} />
        <CurrencyBox label="Euro" onPress={() => handleCurrencyPress('euro')} />
        <CurrencyBox label="Altın" onPress={() => handleCurrencyPress('gold')} />
      </View>

      {selectedCurrency === 'dollar' && (
        <InvestmentInput
          label="Dolar"
          rate={dollarRate}
          setRate={setDollarRate}
          amount={dollarAmount}
          setAmount={setDollarAmount}
          onSave={() => saveTransaction('dollar', dollarRate, dollarAmount)}
          transactionType={transactionType}
        />
      )}
      {selectedCurrency === 'euro' && (
        <InvestmentInput
          label="Euro"
          rate={euroRate}
          setRate={setEuroRate}
          amount={euroAmount}
          setAmount={setEuroAmount}
          onSave={() => saveTransaction('euro', euroRate, euroAmount)}
          transactionType={transactionType}
        />
      )}
      {selectedCurrency === 'gold' && (
        <InvestmentInput
          label="Altın"
          rate={goldRate}
          setRate={setGoldRate}
          amount={goldAmount}
          setAmount={setGoldAmount}
          onSave={() => saveTransaction('gold', goldRate, goldAmount)}
          transactionType={transactionType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  currencyBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd'
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6
  },
  selectedType: {
    backgroundColor: '#007AFF',
    color: 'white'
  }
});

export default InvestScreen;