import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import IncomeEntry from './IncomeEntry';
import ExpenseEntry from './ExpenseEntry';

const ExpensesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gelir ve Gider Yönetimi</Text>
      <IncomeEntry />
      <ExpenseEntry />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#0d2137' },
});

export default ExpensesScreen;
