// src/components/BottomTabNavigator.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/stylesbottom';

interface BottomTabNavigatorProps {
  currentScreen: 'feed' | 'profile';
  onNavigateToFeed: () => void;
  onNavigateToProfile: () => void;
  onLogoPress: () => void;
}

/**
 * Menú inferior de navegación con iconos
 */
const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  currentScreen,
  onNavigateToFeed,
  onNavigateToProfile,
  onLogoPress,
}) => {
  return (
    <View style={styles.bottomTabContainer}>
      {/* Botón Home/Feed */}
      <TouchableOpacity 
        style={styles.bottomTabButton}
        onPress={onNavigateToFeed}
      >
        <Ionicons 
          name={currentScreen === 'feed' ? 'home' : 'home-outline'} 
          size={28} 
          color={currentScreen === 'feed' ? '#ffc95e' : 'rgba(255,255,255,0.7)'} 
        />
        <Text style={[
          styles.bottomTabText,
          currentScreen === 'feed' && styles.bottomTabTextActive
        ]}>
          Inicio
        </Text>
      </TouchableOpacity>

      {/* Botón Perfil */}
      <TouchableOpacity 
        style={styles.bottomTabButton}
        onPress={onNavigateToProfile}
      >
        <Ionicons 
          name={currentScreen === 'profile' ? 'person' : 'person-outline'} 
          size={28} 
          color={currentScreen === 'profile' ? '#ffc95e' : 'rgba(255,255,255,0.7)'} 
        />
        <Text style={[
          styles.bottomTabText,
          currentScreen === 'profile' && styles.bottomTabTextActive
        ]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabNavigator;