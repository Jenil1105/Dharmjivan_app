import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface StatCardProps {
  label: string
  value: string | number
  note: string
  accentColor: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, note, accentColor }) => {
  return (
    <View style={[styles.container, { borderTopColor: accentColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.note}>{note}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderTopWidth: 3,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
  },
  note: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    lineHeight: 18,
  },
})

export default StatCard
