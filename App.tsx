// App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/styles';
import FeedScreen from './src/screens/FeedScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { auth, onAuthStateChanged } from './src/services/firebaseService';
import AuthLoadingOverlay from './src/components/AuthLoadingOverlay';

// Tipo para las pantallas disponibles
type AppScreen = 'feed' | 'profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('feed');

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentScreen('feed');
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setCurrentScreen('profile');
  }, []);

  const handleNavigateToFeed = useCallback(() => {
    setCurrentScreen('feed');
  }, []);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Mostrar loading mientras verifica el estado de autenticación
  if (isAuthenticated === null) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <AuthLoadingOverlay visible={true} message="Verificando sesión..." />
          <StatusBar style="light" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Renderizar la pantalla actual basada en el estado
  const renderCurrentScreen = () => {
    if (!isAuthenticated) {
      return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentScreen) {
      case 'profile':
        return <ProfileScreen onBackToFeed={handleNavigateToFeed} />;
      case 'feed':
      default:
        return (
          <FeedScreen 
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToFeed={handleNavigateToFeed}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {renderCurrentScreen()}
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

