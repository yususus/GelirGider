# Gelir Gider Takip (ReactNative)

<div align="center">

<img src="https://github.com/user-attachments/assets/3b79e2dd-a88b-4bbf-83d3-38841316d8ca" alt="logo" title="İcon" width="100"/>
<div>
  <a href="https://apps.apple.com/tr/app/learn-english-words-sentences/id6737259105?l=tr" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;">

</a>
</div>

React Native ile geliştirilmiş, modern ve etkileşimli bir gelir gider takip uygulaması.



</div>

## ✨ Özellikler

- 🎯 React Native ile modern ve akıcı kullanıcı arayüzü
- 💾 AsyncStorage ile veri kaydı
- 🔄 TabNavigator ile sayfalar arası kolay geçiş
- 🎨 iOS 13+ ve Android için optimize edilmiş tasarım


## 📱 Ekran Görüntüleri

<div align="center">
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d9dff090-104b-4ae0-9820-eacdcc573a1e" alt="Ana Sayfa" title="Ana Sayfa"/></td>
    <td><img src="https://github.com/user-attachments/assets/a2548531-4db2-43ec-bc78-5c444e8bb3b8" alt="Soru Ekranı" title="Soru Ekranı"/></td>
    <td><img src="https://github.com/user-attachments/assets/b0df484d-010b-4d40-afc5-11ec53d946c5" alt="İlerleme" title="İlerleme"/></td>
  </tr>
</table>
</div>

## 🛠 Gereksinimler

- iOS 13.0+
- Android
- Node 18+
- ReactNative 0.75+

### Manuel Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yususus/GelirGider.git
```
2. Gerekli bağımlılıkların yüklendiğinden emin olun
3. Projeyi derleyin ve çalıştırın


### Veri Kaydetme
```swift
 const saveTransaction = async (currency: 'dollar' | 'euro' | 'gold', rate: string, amount: string) => {
    if (rate && amount) {
      try {
        const currentData = await AsyncStorage.getItem('investData');
        const parsedData: InvestmentData = currentData ? JSON.parse(currentData) : {};
        
        const currentCurrencyData = parsedData[currency] || { transactions: [], totalAmount: 0, averageRate: 0 };
        const transactionAmount = parseFloat(amount);
        
        // Satış işlemi için miktar kontrolü
        if (transactionType === 'sell') {
          const currentTotal = calculateTotalAmount(currentCurrencyData.transactions);
          if (transactionAmount > currentTotal) {
            Alert.alert('Hata', `Yetersiz ${currency} bakiyesi. Mevcut: ${currentTotal.toFixed(2)}`);
            return;
          }
        }

        const newTransaction: Transaction = {
          type: transactionType,
          rate: parseFloat(rate),
          amount: transactionAmount,
          date: new Date().toISOString(),
        };

        const updatedTransactions = [...currentCurrencyData.transactions, newTransaction];
        const totalAmount = calculateTotalAmount(updatedTransactions);

        // Ortalama maliyet hesaplama (sadece alış işlemleri için)
        const buyTransactions = updatedTransactions.filter(t => t.type === 'buy');
        const totalBuyAmount = buyTransactions.reduce((sum, t) => sum + t.amount, 0);
        const weightedSum = buyTransactions.reduce((sum, t) => sum + t.rate * t.amount, 0);
        const averageRate = totalBuyAmount > 0 ? weightedSum / totalBuyAmount : 0;

        const updatedCurrencyData: CurrencyData = {
          transactions: updatedTransactions,
          totalAmount,
          averageRate
        };

        const newData: InvestmentData = { ...parsedData, [currency]: updatedCurrencyData };

        await AsyncStorage.setItem('investData', JSON.stringify(newData));
        
        const actionType = transactionType === 'buy' ? 'Alış' : 'Satış';
        Alert.alert(`${currency} ${actionType} İşlemi Kaydedildi`,
          `İşlem Tipi: ${actionType}\n` +
          `İşlem Kuru: ${rate}\n` +
          `İşlem Miktarı: ${amount}\n` +
          `Toplam Miktar: ${totalAmount.toFixed(2)}\n` +
          `Ortalama Maliyet: ${averageRate.toFixed(2)}`
        );

        // İşlem sonrası input alanlarını temizle
        switch(currency) {
          case 'dollar':
            setDollarRate('');
            setDollarAmount('');
            break;
          case 'euro':
            setEuroRate('');
            setEuroAmount('');
            break;
          case 'gold':
            setGoldRate('');
            setGoldAmount('');
            break;
        }
        
      } catch (error) {
        console.error('Kayıt hatası:', error);
        Alert.alert('Hata', 'Veriler kaydedilirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz');
    }
  };
```


<div align="center">
⭐️ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
</div>
