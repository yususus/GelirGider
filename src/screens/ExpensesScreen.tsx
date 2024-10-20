import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ExpensesScreen: React.FC = () => {
  // Gelirler için state
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState<string>('');
  const [incomeAmount, setIncomeAmount] = useState<string>('');

  // Harcamalar için state
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');

  const handleSaveIncome = () => {
    if (selectedIncomeCategory && incomeAmount) {
      Alert.alert('Gelir Kaydedildi', `${selectedIncomeCategory}, Tutar: ${incomeAmount}`);
      // Kaydedilen gelir verilerini işlemek için
    } else {
      Alert.alert('Hata', 'Lütfen bir kategori ve tutar giriniz');
    }
  };

  const handleSaveExpense = () => {
    if (selectedExpenseCategory && expenseAmount) {
      Alert.alert('Harcama Kaydedildi', `${selectedExpenseCategory}, Tutar: ${expenseAmount}`);
      // Kaydedilen harcama verilerini işlemek için
    } else {
      Alert.alert('Hata', 'Lütfen bir kategori ve tutar giriniz');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gelirler Bölümü */}
      <Text style={styles.title}>Gelirler</Text>

      <Text style={styles.label}>Kategoriler:</Text>
      <Picker
        selectedValue={selectedIncomeCategory}
        onValueChange={(itemValue) => setSelectedIncomeCategory(itemValue)}
        style={styles.picker}
        mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}  // iOS'ta dialog, Android'de dropdown
      >
        <Picker.Item label="Bir kategori seçiniz" value="" />
        <Picker.Item label="Maaş" value="Maaş" />
        <Picker.Item label="Kira" value="Kira" />
        <Picker.Item label="Yatırım" value="Yatırım" />
        <Picker.Item label="Diğer" value="Diğer" />
      </Picker>

      <Text style={styles.label}>Tutar:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tutarı giriniz"
        value={incomeAmount}
        onChangeText={setIncomeAmount}
      />
      <TouchableOpacity style={styles.customButton} onPress={handleSaveIncome}>
        <Text style={styles.buttonText}>Gelir Kaydet</Text>
      </TouchableOpacity>

      {/* Harcamalar Bölümü */}
      <Text style={styles.title}>Harcamalar</Text>

      <Text style={styles.label}>Kategoriler:</Text>
      <Picker
        selectedValue={selectedExpenseCategory}
        onValueChange={(itemValue) => setSelectedExpenseCategory(itemValue)}
        style={styles.picker}
        mode={Platform.OS === 'ios' ? 'dialog' : 'dropdown'}  // iOS'ta dialog, Android'de dropdown
      >
        <Picker.Item label="Bir kategori seçiniz" value="" />
        <Picker.Item label="Market" value="Market" />
        <Picker.Item label="Ulaşım" value="Ulaşım" />
        <Picker.Item label="Alışveriş" value="Alışveriş" />
        <Picker.Item label="Kırtasiye / Okul" value="Kırtasiye / Okul" />
        <Picker.Item label="Çevrimiçi Harcamalar" value="Çevrimiçi Harcamalar" />
        <Picker.Item label="Faturalar" value="Faturalar" />
      </Picker>

      <Text style={styles.label}>Tutar:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tutarı giriniz"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />

<TouchableOpacity style={styles.customButton} onPress={handleSaveExpense}>
        <Text style={styles.buttonText}>Harcama Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0d2137',
  },
  label: {
    fontSize: 18,
    marginTop: 16,
    padding: 5,
    paddingTop: 30,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    
  },
  input: {
    padding: 5,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  customButton: {
    backgroundColor: '#4CAF50',  // Butonun arka plan rengi
    padding: 15,                // İç boşluk
    borderRadius: 10,           // Köşelerin yuvarlatılması
    alignItems: 'center',       // Yazının ortalanması
    marginTop: 10,              // Üst boşluk
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',             // Yazı rengi
    fontSize: 18,              // Yazı boyutu
    fontWeight: 'bold',        // Yazı kalınlığı
  },
});

export default ExpensesScreen;
