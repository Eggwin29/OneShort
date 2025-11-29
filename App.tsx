// App.tsx (Actualizado)
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/styles';
import FeedScreen from './src/screens/FeedScreen';
import AuthScreen from './src/screens/AuthScreen';
import { auth, onAuthStateChanged } from './src/services/firebaseService';
import AuthLoadingOverlay from './src/components/AuthLoadingOverlay';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {isAuthenticated ? (
          <FeedScreen />
        ) : (
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        )}
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}