import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Item {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  discounted_price?: number;
  available_quantity?: number;
  total_sold?: number;
  revenue_generated?: number;
  image_url?: string;
}

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0);
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  const isDiscounted = Number(item.discounted_price) > 0;
  const isLowStock = Number(item.available_quantity) <= 10;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>No image</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description || 'No description'}
        </Text>

        <View style={styles.statsRow}>
          <Text style={styles.price}>{formatCurrency(item.discounted_price || 0)}</Text>
          {isDiscounted && (
            <Text style={styles.discountedPrice}>
              {formatCurrency(item.price || 0)}
            </Text>
          )}
        </View>

        <View style={styles.detailsDataRow}>
          <Text style={styles.detailText}>Stock: {item.available_quantity}</Text>
          <Text style={styles.detailText}>Sold: {item.total_sold || 0}</Text>
        </View>

        <View style={styles.detailsDataRow}>
          <Text style={styles.detailText}>
            Rev: {formatCurrency(item.revenue_generated || 0)}
          </Text>
          {isLowStock && <Text style={styles.lowStockText}>Low Stock</Text>}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 12,
    color: '#D97706',
    textDecorationLine: 'line-through',
  },
  detailsDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  detailText: {
    fontSize: 11,
    color: '#475569',
  },
  lowStockText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
  },
  actions: {
    justifyContent: 'space-between',
    height: 80,
  },
  editButton: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemCard;
