import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryPickerModal from './CategoryPickerModal';

const IncomeEntry: React.FC = () => {
  const [incomeCategory, setIncomeCategory] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);

  const incomeCategories = ["Maaş", "Kira", "Yatırım", "Diğer"];

  const handleSaveIncome = async () => {
    if (incomeCategory && incomeAmount) {
      try {
        const existingData = await AsyncStorage.getItem('incomeTotals');
        const incomeTotals = existingData ? JSON.parse(existingData) : {};
        const currentAmount = Number(incomeTotals[incomeCategory]) || 0;
        incomeTotals[incomeCategory] = currentAmount + Number(incomeAmount);
        await AsyncStorage.setItem('incomeTotals', JSON.stringify(incomeTotals));
        Alert.alert('Gelir kaydedildi', `Kategori: ${incomeCategory}, Tutar: ${incomeAmount}`);
        setIncomeAmount('');
        setIncomeCategory('');
      } catch (error) {
        Alert.alert('Hata', 'Gelir kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
    }
  };

  return (
    <View style={styles.entryContainer}>
      <Text style={styles.label}>Gelir Kategorisi:</Text>
      <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.pickerButton}>
        <Text style={styles.buttonText}>{incomeCategory || "Bir kategori seçiniz"}</Text>
      </TouchableOpacity>

      <CategoryPickerModal
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        categories={incomeCategories}
        onSelectCategory={setIncomeCategory}
      />

      <Text style={styles.label}>Tutar:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Tutarı giriniz"
        value={incomeAmount}
        onChangeText={setIncomeAmount}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveIncome}>
        <Text style={styles.buttonText}>Gelir Kaydet</Text>
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

export default IncomeEntry;
