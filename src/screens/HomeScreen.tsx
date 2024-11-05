import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GroupBoxProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const GroupBox: React.FC<GroupBoxProps> = ({ title, children, style }) => {
  return (
    <View style={[styles.groupBox, style]}>
      <View style={styles.titleContainer}>
        <View style={styles.titleBackground}>
          <Text style={styles.groupBoxTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

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
      <Text style={styles.mainTitle}>Özet</Text>
      
      {/* Gelir Bilgileri */}
      {incomeData && (
        <GroupBox title="Döviz Bilgileri">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Dolar Alış Kuru:</Text>
            <Text style={styles.value}>{incomeData.dollarRate} ₺</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Miktar:</Text>
            <Text style={styles.value}>{incomeData.dollarAmount} $</Text>
          </View>
        </GroupBox>
      )}
      
      {/* Gider Bilgileri */}
      {expenseData && (
        <GroupBox title="Harcama Detayları">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Kategori:</Text>
            <Text style={styles.value}>{expenseData.expenseCategory}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tutar:</Text>
            <Text style={styles.value}>{expenseData.expenseAmount} ₺</Text>
          </View>
        </GroupBox>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  groupBox: {
    marginVertical: 10,
    marginHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1,
  },
  titleBackground: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  groupBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  content: {
    padding: 16,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
});

export default HomeScreen;