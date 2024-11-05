import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const IncomeScreen: React.FC = () => {
  // Durumlar (state)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [dollarRate, setDollarRate] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [euroRate, setEuroRate] = useState('');
  const [euroAmount, setEuroAmount] = useState('');
  const [goldRate, setGoldRate] = useState('');
  const [goldAmount, setGoldAmount] = useState('');


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
  
  // Para birimi kutusuna tıklama fonksiyonu
  const handleCurrencyPress = (currency: string) => {
    setSelectedCurrency(currency);
  };

  // Kaydetme fonksiyonları
  const handleSaveDollar = async () => {
    if (dollarRate && dollarAmount) {
      try{
        const currentData = await AsyncStorage.getItem('incomeData');
        const parsedData = currentData ? JSON.parse(currentData) : {};

        const newTransaction: Transaction = {
          rate: parseFloat(dollarRate),
          amount: parseFloat(dollarAmount),
          date : new Date().toISOString()
        };

        const currentDollarData = parsedData.dollar || {transactions: [], totalAmount: 0, averageRate: 0 };

        const updatedTransactions = [...currentDollarData.transactions, newTransaction];

        const totalAmount = updatedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = updatedTransactions.reduce((sum, t) => sum + (t.rate * t.amount), 0);
        const averageRate = weightedSum / totalAmount;

        const updatedDolarData: CurrencyData = {
          transactions: updatedTransactions,
          totalAmount,
          averageRate
        };

        const newData: InvestmentData = {
          ...parsedData,
          dollar: updatedDolarData
        };

        await AsyncStorage.setItem('incomeData', JSON.stringify(newData));
        Alert.alert('Dolar Kaydedildi',
          `İşlem Kuru: ${dollarRate}\n` +
          `İşlem Miktarı: ${dollarAmount}\n` +
          `Toplam Miktar: ${totalAmount}\n` +
          `Ortalama Maliyet: ${averageRate.toFixed(2)}`
        )



      } 
      catch (error) {
        console.error('Kayıt hatası:', error);
        Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };
  
  const handleSaveEuro = async () => {
    if (euroRate && euroAmount) {
      try {
        // Mevcut verileri al
        const currentData = await AsyncStorage.getItem('incomeData');
        const parsedData: InvestmentData = currentData ? JSON.parse(currentData) : {};
        
        const newTransaction: Transaction = {
          rate: parseFloat(euroRate),
          amount: parseFloat(euroAmount),
          date: new Date().toISOString()
        };
  
        // Euro verilerini güncelle
        const currentEuroData = parsedData.euro || { transactions: [], totalAmount: 0, averageRate: 0 };
        
        // Yeni işlemi ekle
        const updatedTransactions = [...currentEuroData.transactions, newTransaction];
        
        // Toplam miktar ve ortalama kur hesapla
        const totalAmount = updatedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = updatedTransactions.reduce((sum, t) => sum + (t.rate * t.amount), 0);
        const averageRate = weightedSum / totalAmount;
  
        const updatedEuroData: CurrencyData = {
          transactions: updatedTransactions,
          totalAmount,
          averageRate
        };
  
        // Tüm verileri güncelle
        const newData: InvestmentData = {
          ...parsedData,
          euro: updatedEuroData
        };
  
        await AsyncStorage.setItem('incomeData', JSON.stringify(newData));
        Alert.alert('Euro Kaydedildi', 
          `İşlem Kuru: ${euroRate}\n` +
          `İşlem Miktarı: ${euroAmount}\n` +
          `Toplam Miktar: ${totalAmount}\n` +
          `Ortalama Maliyet: ${averageRate.toFixed(2)}`
        );
      } catch (error) {
        console.error('Kayıt hatası:', error);
        Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };
  
  const handleSaveGold = async () => {
    if (goldRate && goldAmount) {
      try {
        const currentData = await AsyncStorage.getItem('incomeData');
        const parsedData = currentData ? JSON.parse(currentData) : {};

        const newTransaction: Transaction = {
          rate: parseFloat(goldRate),
          amount: parseFloat(goldAmount),
          date: new Date().toISOString()
        };

        const currentGoldData = parsedData.gold || { transactions: [], totalAmount: 0, averageRate: 0};

        const updatedTransactions = [...currentGoldData.transactions, newTransaction];

        const totalAmount = updatedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = updatedTransactions.reduce((sum,t) => sum + (t.rate * t.amount), 0);
        const averageRate = weightedSum / totalAmount;

        const updatedGoldData: CurrencyData = {
          transactions: updatedTransactions,
          totalAmount,
          averageRate
        };

        const newData: InvestmentData = {
          ...parsedData,
          gold: updatedGoldData
        };

        await AsyncStorage.setItem('incomeData', JSON.stringify(newData));
        Alert.alert('Altın Kaydedildi',
          `İşlem Kuru: ${goldRate}\n` +
          `İşlem Miktarı: ${goldAmount}\n` +
          `Toplam Miktar: ${totalAmount}\n` +
          `Ortalama Maliyet: ${averageRate.toFixed(2)}`
        );
      }
      catch (error){
        console.error('Kayıt hatası: ', error);
        Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştur');
      } 
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yatırım Ekranı</Text>

      <View style={styles.currencyBoxContainer}>
        <TouchableOpacity
          style={styles.currencyBox}
          onPress={() => handleCurrencyPress('dollar')}
        >
          <Text style={styles.currencyText}>Dolar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.currencyBox}
          onPress={() => handleCurrencyPress('euro')}
        >
          <Text style={styles.currencyText}>Euro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.currencyBox}
          onPress={() => handleCurrencyPress('gold')}
        >
          <Text style={styles.currencyText}>Altın</Text>
        </TouchableOpacity>
      </View>

      {/* Seçilen para birimine göre değişen ekranlar*/}
      {selectedCurrency === 'dollar' && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Dolar Alış Kuru:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Alış kuru giriniz"
            value={dollarRate}
            onChangeText={setDollarRate}
          />
          <Text style={styles.inputLabel}>Dolar Miktarı:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Miktar giriniz"
            value={dollarAmount}
            onChangeText={setDollarAmount}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveDollar}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedCurrency === 'euro' && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Euro Alış Kuru:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Alış kuru giriniz"
            value={euroRate}
            onChangeText={setEuroRate}
          />
          <Text style={styles.inputLabel}>Euro Miktarı:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Miktar giriniz"
            value={euroAmount}
            onChangeText={setEuroAmount}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEuro}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedCurrency === 'gold' && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Altın Alış Kuru:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Alış kuru giriniz"
            value={goldRate}
            onChangeText={setGoldRate}
          />
          <Text style={styles.inputLabel}>Altın Miktarı:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Miktar giriniz"
            value={goldAmount}
            onChangeText={setGoldAmount}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveGold}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  currencyBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  currencyBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    marginVertical: 10,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IncomeScreen;
