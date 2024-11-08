import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryPickerModal from './CategoryPickerModal';

const ExpenseEntry: React.FC = () => {
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const expenseCategories = ["Market", "Ulaşım", "Alışveriş", "Kırtasiye / Okul", "Çevrimiçi Harcamalar", "Faturalar"];

  const handleSaveExpense = async () => {
    if (expenseCategory && expenseAmount) {
      try {
        const existingData = await AsyncStorage.getItem('expenseTotals');
        const expenseTotals = existingData ? JSON.parse(existingData) : {};
        const currentAmount = Number(expenseTotals[expenseCategory]) || 0;
        expenseTotals[expenseCategory] = currentAmount + Number(expenseAmount);
        await AsyncStorage.setItem('expenseTotals', JSON.stringify(expenseTotals));
        Alert.alert('Harcama kaydedildi', `Kategori: ${expenseCategory}, Tutar: ${expenseAmount}`);
        setExpenseAmount('');
        setExpenseCategory('');
      } catch (error) {
        Alert.alert('Hata', 'Harcama kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
    }
  };

  return (
    <View style={styles.entryContainer}>
      <Text style={styles.label}>Harcama Kategorisi:</Text>
      <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.pickerButton}>
        <Text style={styles.buttonText}>{expenseCategory || "Bir kategori seçiniz"}</Text>
      </TouchableOpacity>

      <CategoryPickerModal
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        categories={expenseCategories}
        onSelectCategory={setExpenseCategory}
      />

      <Text style={styles.label}>Tutar:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tutarı giriniz"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveExpense}>
        <Text style={styles.buttonText}>Harcama Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: { marginBottom: 30 },
  label: { fontSize: 18, marginTop: 16, padding: 5 },
  input: { padding: 5, height: 50, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8, borderRadius: 10, marginBottom: 16 },
  pickerButton: { backgroundColor: '#37cfed', padding: 15, borderRadius: 10, marginBottom: 16, alignItems: 'center' },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default ExpenseEntry;
