import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import StatCard from '../../components/admin/StatCard'
import OperationsPulse from '../../components/admin/OperationsPulse'
import QuickActions from '../../components/admin/QuickActions'
import LoadingState from '../../components/admin/LoadingState'

type ActiveView = 'dashboard' | 'add-item' | 'items';


interface DashboardStats {
  totalItems: number
  totalRevenue: number
  totalSold: number
  lowStockItems: number
  topCategory: string
  averagePrice: number
}

interface Item {
  category?: string
  revenue_generated?: number
  total_sold?: number
  available_quantity?: number
  price?: number
}

interface DashboardScreenProps {
  setActiveView: (view: ActiveView) => void
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ setActiveView }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    totalRevenue: 0,
    totalSold: 0,
    lowStockItems: 0,
    topCategory: 'No data yet',
    averagePrice: 0,
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value)
  }

  const fetchStats = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/items')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const items: Item[] = await response.json()

      // Calculate category counts
      const categoryCounts: Record<string, number> = items.reduce(
        (accumulator, item) => {
          const category = item.category?.trim() || 'Uncategorized'
          accumulator[category] = (accumulator[category] || 0) + 1
          return accumulator
        },
        {} as Record<string, number>
      )

      // Get top category
      const sortedCategories = Object.entries(categoryCounts).sort(
        (first, second) => second[1] - first[1]
      )
      const topCategory = sortedCategories[0]?.[0] || 'No data yet'

      // Calculate stats
      const totalItems = items.length
      const totalRevenue = items.reduce((sum, item) => sum + (item.revenue_generated || 0), 0)
      const totalSold = items.reduce((sum, item) => sum + (item.total_sold || 0), 0)
      const lowStockItems = items.filter((item) => (item.available_quantity || 0) <= 10).length
      const averagePrice =
        totalItems > 0 ? items.reduce((sum, item) => sum + (item.price || 0), 0) / totalItems : 0

      setStats({
        totalItems,
        totalRevenue,
        totalSold,
        lowStockItems,
        topCategory,
        averagePrice,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      Alert.alert('Error', 'Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statCardsData = [
    {
      key: 'totalItems',
      label: 'Products listed',
      value: stats.totalItems,
      accentColor: '#EF4444',
      note: 'Across the current product catalog',
    },
    {
      key: 'totalRevenue',
      label: 'Revenue captured',
      value: formatCurrency(stats.totalRevenue),
      accentColor: '#F59E0B',
      note: 'Calculated from recorded item performance',
    },
    {
      key: 'totalSold',
      label: 'Units sold',
      value: stats.totalSold,
      accentColor: '#DC2626',
      note: 'Lifetime units fulfilled',
    },
  ]

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Image source={require('../../assets/logo.png')} style={styles.navLogo} />
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => setActiveView('add-item')} style={styles.navIcon}>
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveView('items')} style={styles.navIcon}>
            <Text style={styles.iconText}>📋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stat Cards Section */}
        <View style={styles.statCardsSection}>
          {statCardsData.map((card) => (
            <StatCard
              key={card.key}
              label={card.label}
              value={card.value}
              note={card.note}
              accentColor={card.accentColor}
            />
          ))}
        </View>

        {/* Operations and Quick Actions Section */}
        <OperationsPulse
          lowStockItems={stats.lowStockItems}
          totalSold={stats.totalSold}
          totalItems={stats.totalItems}
        />

        <QuickActions
          onCreateProduct={() => setActiveView('add-item')}
          onReviewCatalog={() => setActiveView('items')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  navLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  navIcons: {
    flexDirection: 'row',
  },
  navIcon: {
    marginLeft: 16,
    padding: 8,
  },
  iconText: {
    fontSize: 20,
    color: '#EF4444',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statCardsSection: {
    marginBottom: 16,
  },
})

export default DashboardScreen
