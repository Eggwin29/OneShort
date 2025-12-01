// App.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, onAuthStateChanged } from './src/services/firebaseService';
import AuthLoadingOverlay from './src/components/AuthLoadingOverlay';
import AuthScreen from './src/screens/AuthScreen';
import BottomTabNavigator from './src/components/BottomTabNavigator';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    return (
      <SafeAreaProvider>
        <AuthLoadingOverlay visible={true} message="Verificando sesión..." />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen
              name="Auth"
              children={(props) => (
                <AuthScreen
                  {...props}
                  onAuthSuccess={() => setIsAuthenticated(true)}
                />
              )}
            />
          ) : (
            <Stack.Screen name="Main">
              {() => (
                <BottomTabNavigator 
                  onLogout={() => setIsAuthenticated(false)} // ← AQUÍ
                />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}


