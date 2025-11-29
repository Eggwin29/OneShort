// src/components/LoadingOverlay.tsx

import React from 'react';
import { View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface LoadingOverlayProps {
  rotateData: Animated.AnimatedInterpolation<string>;
}

/**
 * Overlay de carga animado que se muestra al recargar el feed.
 */
const LoadingOverlay: React.FC<LoadingOverlayProps> = React.memo(({ rotateData }) => (
  <View style={styles.loadingOverlay}>
    <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
      <Ionicons name="refresh" size={50} color="white" />
    </Animated.View>
  </View>
));

export default LoadingOverlay;