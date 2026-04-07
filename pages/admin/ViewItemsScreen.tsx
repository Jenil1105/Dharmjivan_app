import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ItemCard from '../../components/admin/ItemCard';

type ActiveView = 'dashboard' | 'add-item' | 'items' | 'edit-item';

interface ViewItemsScreenProps {
  setActiveView: (view: ActiveView) => void;
  setSelectedItem: (item: any) => void;
}

const ViewItemsScreen: React.FC<ViewItemsScreenProps> = ({
  setActiveView,
  setSelectedItem,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (err: any) {
      setError(`Error fetching items: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: 'DELETE',
              });
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              setItems((currentItems) => currentItems.filter((item) => item._id !== id));
            } catch (err: any) {
              Alert.alert('Error', `Failed to delete item: ${err.message}`);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setActiveView('edit-item');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#F59E0B" />
          <Text style={styles.loadingText}>Loading product catalog...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveView('dashboard')} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewSubtitle}>Catalog overview</Text>
          <Text style={styles.overviewTitle}>Product Catalog</Text>
          <Text style={styles.overviewDescription}>
            Browse all items, monitor stock, and remove outdated entries when needed.
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>{items.length} active</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setActiveView('add-item')}
            >
              <Text style={styles.addButtonText}>Add product</Text>
            </TouchableOpacity>
          </View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No items found yet</Text>
            <Text style={styles.emptySubtitle}>
              Start building the catalog by adding your first product.
            </Text>
            <TouchableOpacity
              style={styles.addFirstButton}
              onPress={() => setActiveView('add-item')}
            >
              <Text style={styles.addFirstButtonText}>Add first item</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#EF4444',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#EF4444',
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
  },
  overviewDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  activePill: {
    backgroundColor: '#FFFBEB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  activePillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B45309',
  },
  addButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  addFirstButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  addFirstButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  itemsList: {
    paddingBottom: 24,
  },
});

export default ViewItemsScreen;
