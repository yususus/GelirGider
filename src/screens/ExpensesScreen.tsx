import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpensesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <Text style={styles.description}>This screen will show a list of all your expenses.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ExpensesScreen;
