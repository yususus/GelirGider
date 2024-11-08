import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CurrencyBoxProps {
  label: string;
  onPress: () => void;
}

const CurrencyBox: React.FC<CurrencyBoxProps> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.currencyBox} onPress={onPress}>
    <Text style={styles.currencyText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  currencyBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    marginVertical: 10,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CurrencyBox;
