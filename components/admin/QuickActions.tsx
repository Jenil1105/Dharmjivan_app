import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface QuickActionsProps {
  onCreateProduct: () => void
  onReviewCatalog: () => void
}

const QuickActions: React.FC<QuickActionsProps> = ({ onCreateProduct, onReviewCatalog }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Quick Actions</Text>
      <Text style={styles.sectionTitle}>Move faster</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.createButton]}
          onPress={onCreateProduct}
          activeOpacity={0.7}
        >
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Create product entry</Text>
            <Text style={styles.actionDescription}>Add pricing, category, image, and stock.</Text>
          </View>
          <Text style={styles.actionIcon}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.reviewButton]}
          onPress={onReviewCatalog}
          activeOpacity={0.7}
        >
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Review product catalog</Text>
            <Text style={styles.actionDescription}>
              Inspect product details and remove stale listings.
            </Text>
          </View>
          <Text style={styles.actionIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 2.8,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
    marginBottom: 24,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  reviewButton: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEE2E2',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  actionIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 12,
  },
})

export default QuickActions
