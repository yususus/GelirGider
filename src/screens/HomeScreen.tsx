import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, ScrollView,RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GroupBoxProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

// Yatırım verisi için interface
interface Transaction {
  rate: number;
  amount: number;
  date: string;
}

interface CurrencyData {
  transactions: Transaction[];
  totalAmount: number;
  averageRate: number;
}

interface InvestmentData {
  dollar?: CurrencyData;
  euro?: CurrencyData;
  gold?: CurrencyData;
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
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  const [expenseData, setExpenseData] = useState<{ expenseCategory: string; expenseAmount: string } | null>(null);
  const [incomeData, setIncomeData] = useState<{ incomeCategory: string; incomeAmount: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false); //sayfa güncellemek için

  // Veriyi yükleyen fonksiyon
  const loadData = async () => {
    try {
      const invest = await AsyncStorage.getItem('investData');
      const expense = await AsyncStorage.getItem('expenseData');
      const income = await AsyncStorage.getItem('incomeData');
      
      if (invest) {
        const parsedInvest = JSON.parse(invest);
        setInvestmentData(parsedInvest);
      }
      
      if (expense) {
        const parsedExpense = JSON.parse(expense);
        setExpenseData(parsedExpense);
      }

      if (income) {
        const parsedIncome = JSON.parse(income);
        setIncomeData(parsedIncome);
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sayfayı aşağı çekip güncelleme fonksiyonu
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData(); // Veriyi yeniden yükle
    setRefreshing(false); // Yenilemeyi durdur
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.mainTitle}>Özet</Text>
      
      {/* Yatırım Bilgileri */}
      {investmentData && (
        <GroupBox title="Döviz ve Altın Bilgileri">
          {/* dolar Bilgileri */}
          {investmentData.dollar && (
            <>
              <View style={styles.currencyHeader}>
                <Text style={styles.currencyTitle}>Dolar Portföyü</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Miktar:</Text>
                <Text style={styles.value}>{investmentData.dollar.totalAmount.toFixed(2)} $</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ortalama Maliyet:</Text>
                <Text style={styles.value}>{investmentData.dollar.averageRate.toFixed(2)} ₺</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Maliyet:</Text>
                <Text style={styles.value}>
                  {(investmentData.dollar.totalAmount * investmentData.dollar.averageRate).toFixed(2)} ₺
                </Text>
              </View>
              
              {/* Son İşlemler */}
              <View style={styles.transactionsContainer}>
                <Text style={styles.sectionTitle}>Son İşlemler</Text>
                {investmentData.dollar.transactions.slice(-3).reverse().map((transaction, index) => (
                  <View key={index} style={styles.transactionRow}>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString('tr-TR')}
                    </Text>
                    <Text style={styles.transactionAmount}>{transaction.amount} $</Text>
                    <Text style={styles.transactionRate}>{transaction.rate} ₺</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          
          {/* Euro Bilgileri */}
          {investmentData.euro && (
            <>
              <View style={styles.currencyHeader}>
                <Text style={styles.currencyTitle}>Euro Portföyü</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Miktar:</Text>
                <Text style={styles.value}>{investmentData.euro.totalAmount.toFixed(2)} €</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ortalama Maliyet:</Text>
                <Text style={styles.value}>{investmentData.euro.averageRate.toFixed(2)} ₺</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Maliyet:</Text>
                <Text style={styles.value}>
                  {(investmentData.euro.totalAmount * investmentData.euro.averageRate).toFixed(2)} ₺
                </Text>
              </View>
              
              {/* Son İşlemler */}
              <View style={styles.transactionsContainer}>
                <Text style={styles.sectionTitle}>Son İşlemler</Text>
                {investmentData.euro.transactions.slice(-3).reverse().map((transaction, index) => (
                  <View key={index} style={styles.transactionRow}>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString('tr-TR')}
                    </Text>
                    <Text style={styles.transactionAmount}>{transaction.amount} €</Text>
                    <Text style={styles.transactionRate}>{transaction.rate} ₺</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          {/* altın Bilgileri */}
          {investmentData.gold && (
            <>
              <View style={styles.currencyHeader}>
                <Text style={styles.currencyTitle}>Altın Portföyü</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Miktar:</Text>
                <Text style={styles.value}>{investmentData.gold.totalAmount.toFixed(2)} GR.</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Ortalama Maliyet:</Text>
                <Text style={styles.value}>{investmentData.gold.averageRate.toFixed(2)} ₺</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Toplam Maliyet:</Text>
                <Text style={styles.value}>
                  {(investmentData.gold.totalAmount * investmentData.gold.averageRate).toFixed(2)} ₺
                </Text>
              </View>
              
              {/* Son İşlemler */}
              <View style={styles.transactionsContainer}>
                <Text style={styles.sectionTitle}>Son İşlemler</Text>
                {investmentData.gold.transactions.slice(-3).reverse().map((transaction, index) => (
                  <View key={index} style={styles.transactionRow}>
                    <Text style={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString('tr-TR')}
                    </Text>
                    <Text style={styles.transactionAmount}>{transaction.amount} GR.</Text>
                    <Text style={styles.transactionRate}>{transaction.rate} ₺</Text>
                  </View>
                ))}
              </View>
            </>
          )}
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

      {/* Gelir Bilgileri */}
      {incomeData && (
        <GroupBox title="Gelir Detayları">
          <View style={styles.infoRow}>
            <Text style={styles.label}>Kategori:</Text>
            <Text style={styles.value}>{incomeData.incomeCategory}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tutar:</Text>
            <Text style={styles.value}>{incomeData.incomeAmount} ₺</Text>
          </View>
        </GroupBox>
      )}
    </ScrollView>
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
    marginBottom: 30,
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
  currencyHeader: {
    paddingTop: 15,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  currencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  transactionsContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  transactionRate: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomeScreen;