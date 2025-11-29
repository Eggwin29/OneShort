// App.tsx (Modificado)

import React, { useState, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/styles';
import FeedScreen from './src/screens/FeedScreen'; // Tu pantalla de feed existente
import AuthScreen from './src/screens/AuthScreen'; // Tu nueva pantalla de auth

export default function App() {
  // Simulación del estado de autenticación. En una app real, usarías un Context/Redux.
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicia en false

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {isAuthenticated ? (
          // 1. Si está autenticado, muestra el Feed
          <FeedScreen />
        ) : (
          // 2. Si NO está autenticado, muestra el AuthScreen
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        )}
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}