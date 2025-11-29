// App.tsx (Modificado)

import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { styles } from './src/styles/styles';
import FeedScreen from './src/screens/FeedScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* El componente principal que contiene toda la lógica */}
        <FeedScreen />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}