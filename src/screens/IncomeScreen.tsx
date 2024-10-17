import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income</Text>
      <Text style={styles.description}>This screen will show a list of all your income sources.</Text>
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

export default IncomeScreen;
