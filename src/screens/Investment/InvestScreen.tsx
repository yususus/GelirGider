import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyBox from './CurrencyBox';
import InvestmentInput from './InvestmentInput';

interface Transaction {
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
  const [dollarRate, setDollarRate] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [euroRate, setEuroRate] = useState('');
  const [euroAmount, setEuroAmount] = useState('');
  const [goldRate, setGoldRate] = useState('');
  const [goldAmount, setGoldAmount] = useState('');

  const handleCurrencyPress = (currency: string) => setSelectedCurrency(currency);

  const saveTransaction = async (currency: 'dollar' | 'euro' | 'gold', rate: string, amount: string) => {
    if (rate && amount) {
      try {
        const currentData = await AsyncStorage.getItem('investData');
        const parsedData: InvestmentData = currentData ? JSON.parse(currentData) : {};

        const newTransaction: Transaction = {
          rate: parseFloat(rate),
          amount: parseFloat(amount),
          date: new Date().toISOString(),
        };

        const currentCurrencyData = parsedData[currency] || { transactions: [], totalAmount: 0, averageRate: 0 };
        const updatedTransactions = [...currentCurrencyData.transactions, newTransaction];
        const totalAmount = updatedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = updatedTransactions.reduce((sum, t) => sum + t.rate * t.amount, 0);
        const averageRate = weightedSum / totalAmount;

        const updatedCurrencyData: CurrencyData = { transactions: updatedTransactions, totalAmount, averageRate };
        const newData: InvestmentData = { ...parsedData, [currency]: updatedCurrencyData };

        await AsyncStorage.setItem('investData', JSON.stringify(newData));
        Alert.alert(`${currency} Kaydedildi`,
          `İşlem Kuru: ${rate}\nİşlem Miktarı: ${amount}\nToplam Miktar: ${totalAmount}\nOrtalama Maliyet: ${averageRate.toFixed(2)}`
        );
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  currencyBoxContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
});

export default InvestScreen;
