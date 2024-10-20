import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const IncomeScreen: React.FC = () => {
  // Durumlar (state)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [dollarRate, setDollarRate] = useState<string>('');
  const [dollarAmount, setDollarAmount] = useState<string>('');
  const [euroRate, setEuroRate] = useState<string>('');
  const [euroAmount, setEuroAmount] = useState<string>('');
  const [goldRate, setGoldRate] = useState<string>('');
  const [goldAmount, setGoldAmount] = useState<string>('');

  // Para birimi kutusuna tıklama fonksiyonu
  const handleCurrencyPress = (currency: string) => {
    setSelectedCurrency(currency);
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
});

export default IncomeScreen;
