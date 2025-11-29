// src/components/AuthLoadingOverlay.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface AuthLoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const AuthLoadingOverlay: React.FC<AuthLoadingOverlayProps> = ({ 
  visible, 
  message = 'Cargando...' 
}) => {
  if (!visible) return null;

  return (
    <View style={styles.loadingOverlay}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
});

export default AuthLoadingOverlay;