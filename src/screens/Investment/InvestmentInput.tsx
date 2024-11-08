import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface InvestmentInputProps {
  rate: string;
  setRate: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  onSave: () => void;
  label: string;
}

const InvestmentInput: React.FC<InvestmentInputProps> = ({ rate, setRate, amount, setAmount, onSave, label }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label} Alış Kuru:</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Alış kuru giriniz"
      value={rate}
      onChangeText={setRate}
    />
    <Text style={styles.inputLabel}>{label} Miktarı:</Text>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Miktar giriniz"
      value={amount}
      onChangeText={setAmount}
    />
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      <Text style={styles.saveButtonText}>Kaydet</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: { marginTop: 20, width: '100%' },
  inputLabel: { fontSize: 16, marginBottom: 8 },
  input: { width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 16 },
  saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default InvestmentInput;
