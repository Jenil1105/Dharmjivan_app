import React from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'

const LoadingState: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0)
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin())
    }
    spin()
  }, [spinValue])

  const spinAnim = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spinAnim }] }]} />
      <Text style={styles.text}>Loading dashboard insights...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // Height similar to stat cards area
    minHeight: 288,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#FED7AA',
    borderTopColor: '#EF4444',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
})

export default LoadingState
