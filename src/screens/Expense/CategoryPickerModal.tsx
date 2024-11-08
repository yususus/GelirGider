import React from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

interface CategoryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({ visible, onClose, categories, onSelectCategory }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Kategori Seçin</Text>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectCategory(category);
                onClose();
              }}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Kapat" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', marginHorizontal: 20, padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  categoryText: { fontSize: 18, paddingVertical: 8, textAlign: 'center' },
});

export default CategoryPickerModal;
