import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface OperationsPulseProps {
  lowStockItems: number
  totalSold: number
  totalItems: number
}

interface PulseItem {
  label: string
  value: number
  note: string
  bgColor: string
  textColor: string
  labelColor: string
}

const OperationsPulse: React.FC<OperationsPulseProps> = ({
  lowStockItems,
  totalSold,
  totalItems,
}) => {
  const pulseItems: PulseItem[] = [
    {
      label: 'Low Stock',
      value: lowStockItems,
      note: 'Items with ≤10 units.',
      bgColor: '#FEE2E2',
      textColor: '#B91C1C',
      labelColor: '#F87171',
    },
    {
      label: 'Sales',
      value: totalSold,
      note: 'Total units sold.',
      bgColor: '#FEF3C7',
      textColor: '#B45309',
      labelColor: '#FBBF24',
    },
    {
      label: 'Catalog',
      value: totalItems,
      note: 'Total live products.',
      bgColor: '#FED7AA',
      textColor: '#92400E',
      labelColor: '#FB923C',
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sectionLabel}>Operations Pulse</Text>
          <Text style={styles.sectionTitle}>What needs attention</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Live summary</Text>
        </View>
      </View>

      <View style={styles.pulseGrid}>
        {pulseItems.map((item, index) => (
          <View key={index} style={[styles.pulseItem, { backgroundColor: item.bgColor }]}>
            <Text style={[styles.pulseLabel, { color: item.labelColor }]}>{item.label}</Text>
            <Text style={[styles.pulseValue, { color: item.textColor }]}>{item.value}</Text>
            <Text style={[styles.pulseNote, { color: item.textColor }]}>{item.note}</Text>
          </View>
        ))}
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
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  },
  badge: {
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  pulseGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  pulseItem: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
  },
  pulseLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  pulseValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  pulseNote: {
    fontSize: 12,
    opacity: 0.75,
  },
})

export default OperationsPulse
