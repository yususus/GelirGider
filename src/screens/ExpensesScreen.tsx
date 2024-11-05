import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ExpensesScreen: React.FC = () => {
  const [incomeCategory, setIncomeCategory] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [isIncomePickerVisible, setIncomePickerVisible] = useState(false);
  const [isExpensePickerVisible, setExpensePickerVisible] = useState(false);

  const incomeCategories = ["Maaş", "Kira", "Yatırım", "Diğer"];
  const expenseCategories = ["Market", "Ulaşım", "Alışveriş", "Kırtasiye / Okul", "Çevrimiçi Harcamalar", "Faturalar"];

/*
  const handleSaveIncome = () => {
    if (selectedIncomeCategory && incomeAmount) {
      
      Alert.alert('Gelir Kaydedildi', `${selectedIncomeCategory}, Tutar: ${incomeAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen bir kategori ve tutar giriniz');
    }
  };
  */
  const handleSaveIncome = async () => {
    if (incomeCategory && incomeAmount) {
      const incomeData = { incomeCategory, incomeAmount };
      await AsyncStorage.setItem('incomeData', JSON.stringify(incomeData));
      Alert.alert('Gelir kaydedildi', `Kategori: ${incomeCategory}, Tutar: ${incomeAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
    }
  }
/* eski hali
  const handleSaveExpense = () => {
    if (selectedExpenseCategory && expenseAmount) {
      
      Alert.alert('Harcama Kaydedildi', `${selectedExpenseCategory}, Tutar: ${expenseAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen bir kategori ve tutar giriniz');
    }
  };
  */

  const handleSaveExpense = async () => {
    if (expenseCategory && expenseAmount) {
      const expenseData = { expenseCategory, expenseAmount };
      await AsyncStorage.setItem('expenseData', JSON.stringify(expenseData));
      Alert.alert('Harcama Kaydedildi', `Kategori: ${expenseCategory}, Tutar: ${expenseAmount}`);
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gelirler</Text>

      <Text style={styles.label}>Kategoriler:</Text>
      <TouchableOpacity onPress={() => setIncomePickerVisible(true)} style={styles.pickerButton}>
        <Text style={styles.buttonText}>{incomeCategory || "Bir kategori seçiniz"}</Text>
      </TouchableOpacity>

      <Modal visible={isIncomePickerVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gelir Kategorisi Seçin</Text>
            {incomeCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIncomeCategory(category);
                  setIncomePickerVisible(false);
                }}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Kapat" onPress={() => setIncomePickerVisible(false)} />
          </View>
        </View>
      </Modal>

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

      <Text style={styles.title}>Harcamalar</Text>

      <Text style={styles.label}>Kategoriler:</Text>
      <TouchableOpacity onPress={() => setExpensePickerVisible(true)} style={styles.pickerButton}>
        <Text style={styles.buttonText}>{expenseCategory || "Bir kategori seçiniz"}</Text>
      </TouchableOpacity>

      <Modal visible={isExpensePickerVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Harcama Kategorisi Seçin</Text>
            {expenseCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setExpenseCategory(category);
                  setExpensePickerVisible(false);
                }}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Kapat" onPress={() => setExpensePickerVisible(false)} />
          </View>
        </View>
      </Modal>

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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#0d2137' },
  label: { fontSize: 18, marginTop: 16, padding: 5 },
  input: { padding: 5, height: 50, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 8, marginBottom: 16, borderRadius: 10 },
  customButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  pickerButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 10, marginBottom: 16, alignItems: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', marginHorizontal: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  categoryText: { fontSize: 18, paddingVertical: 8, textAlign: 'center' },
});

export default ExpensesScreen;
