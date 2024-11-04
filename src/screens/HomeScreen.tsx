import React , {useEffect, useState}from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const [incomeData, setIncomeData] = useState<{ dollarRate: string; dollarAmount: string } | null>(null);
  const [expenseData, setExpenseData] = useState<{ expenseCategory: string; expenseAmount: string } | null>(null);


  useEffect(() => {
    const loadData = async () => {
      const income = await AsyncStorage.getItem('incomeData');
      const expense = await AsyncStorage.getItem('expenseData');
      if (income) setIncomeData(JSON.parse(income));
      if (expense) setExpenseData(JSON.parse(expense));
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Özet</Text>
      {incomeData && (
        <Text>Dolar Alış Kuru: {incomeData.dollarRate}, Miktar: {incomeData.dollarAmount}</Text>
      )}
      {expenseData && (
        <Text>Harcama - Kategori: {expenseData.expenseCategory}, Tutar: {expenseData.expenseAmount}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
});

export default HomeScreen;

