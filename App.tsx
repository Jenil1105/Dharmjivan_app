import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DashboardScreen, AddItemScreen, ViewItemsScreen } from './pages/admin';

type ActiveView = 'dashboard' | 'add-item' | 'items' | 'edit-item';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {isLoading ? (
        <SplashScreen />
      ) : activeView === 'dashboard' ? (
        <DashboardScreen setActiveView={setActiveView} />
      ) : activeView === 'add-item' ? (
        <AddItemScreen setActiveView={setActiveView} />
      ) : activeView === 'edit-item' ? (
        <AddItemScreen setActiveView={setActiveView} mode="edit" initialData={selectedItem} />
      ) : activeView === 'items' ? (
        <ViewItemsScreen setActiveView={setActiveView} setSelectedItem={setSelectedItem} />
      ) : (
        <DashboardScreen setActiveView={setActiveView} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
    marginTop: 8,
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  dashboardSubtitle: {
    fontSize: 16,
    color: '#555555',
  },
});

export default App;
