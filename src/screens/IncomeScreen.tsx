import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const IncomeScreen: React.FC = () => {
  // Durumlar (state)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [dollarRate, setDollarRate] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [euroRate, setEuroRate] = useState<string>('');
  const [euroAmount, setEuroAmount] = useState<string>('');
  const [goldRate, setGoldRate] = useState<string>('');
  const [goldAmount, setGoldAmount] = useState<string>('');

  
  // Para birimi kutusuna tıklama fonksiyonu
  const handleCurrencyPress = (currency: string) => {
    setSelectedCurrency(currency);
  };

  // Kaydetme fonksiyonları
  const handleSaveDollar = async () => {
    if (dollarRate && dollarAmount) {
      const incomeData = { dollarRate, dollarAmount };
      await AsyncStorage.setItem('incomeData', JSON.stringify(incomeData));
      Alert.alert('Dolar Kaydedildi', `Dolar Alış Kuru: ${dollarRate}, Miktar: ${dollarAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };

  const handleSaveEuro = () => {
    if (euroRate && euroAmount) {
      Alert.alert('Euro Kaydedildi', `Euro Alış Kuru: ${euroRate}, Miktar: ${euroAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };

  const handleSaveGold = () => {
    if (goldRate && goldAmount) {
      Alert.alert('Altın Kaydedildi', `Altın Alış Kuru: ${goldRate}, Miktar: ${goldAmount}`);
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
