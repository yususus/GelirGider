import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExpensesScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); 

  const handleSave = () => { //kaydet butonu
    
    if (selectedCategory && amount) {
      Alert.alert('Harcama Kaydedildi', `${selectedCategory}, Fiyat: ${amount}`);
      // Kaydedilen verileri işlemek için 
    } else {
      Alert.alert('Hata', 'Lütfen bir içerik seçiniz');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harcamalar</Text>

      <Text style={styles.label}>Kategoriler:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Bir kategori seçiniz" value="" />
        <Picker.Item label="Market" value="Market" />
        <Picker.Item label="Ulaşım" value="Ulaşım" />
        <Picker.Item label="Alışveriş" value="Alışveriş" />
        <Picker.Item label="Kırtasiye / Okul" value="Kırtasiye / Okul" />
        <Picker.Item label="Çevrimiçi Harcamalar" value="Çevrim içi Harcamalar" />
        <Picker.Item label="Faturalar" value="Faturalar" />
      </Picker>

      <Text style={styles.label}>Tutar:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0d2137',
  },
  label: {
    fontSize: 18,
    marginTop: 16,
    padding:5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    padding:5,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
});

export default ExpensesScreen;
