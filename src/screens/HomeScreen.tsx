import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
  const incomes = useSelector((state: RootState) => state.expenses.incomes);
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const investments = useSelector((state: RootState) => state.investment.investments);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gelirler</Text>
      {incomes.map((income, index) => (
        <Text key={index}>{income.category}: {income.amount}</Text>
      ))}

      <Text style={styles.title}>Harcamalar</Text>
      {expenses.map((expense, index) => (
        <Text key={index}>{expense.category}: {expense.amount}</Text>
      ))}
      <Text style={styles.title}>Yatırımlar</Text>
      {investments.map((investment, index) => (
        <Text key={index}>
          {investment.currency}: Alış Kuru: {investment.rate}, Miktar: {investment.amount}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
});

export default HomeScreen;

