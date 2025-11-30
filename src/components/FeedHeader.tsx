// src/components/FeedHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';

interface FeedHeaderProps {
  onLogoPress: () => void;
  onNavigateToProfile: () => void;
  onNavigateToFeed: () => void;
  currentScreen?: 'feed' | 'profile';
}

/**
 * Componente de encabezado que incluye el logo y los botones "Tu perfil" y "Para Ti".
 */
const FeedHeader: React.FC<FeedHeaderProps> = React.memo(({ 
  onLogoPress, 
  onNavigateToProfile, 
  onNavigateToFeed,
  currentScreen = 'feed'
}) => (
  <View style={styles.header}>
    <TouchableOpacity 
      style={styles.logoButton}
      onPress={onLogoPress}
      activeOpacity={0.8}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logoIcon}
      />
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={styles.headerButton}
      onPress={onNavigateToProfile}
    >
      <Text style={
        currentScreen === 'profile' ? styles.headerTextActive : styles.headerTextInactive
      }>
        Tu perfil
      </Text>
    </TouchableOpacity>
    
    <Text style={styles.headerTextDivider}>|</Text>
    
    <TouchableOpacity 
      style={styles.headerButton}
      onPress={onNavigateToFeed}
    >
      <Text style={
        currentScreen === 'feed' ? styles.headerTextActive : styles.headerTextInactive
      }>
        Para Ti
      </Text>
    </TouchableOpacity>
  </View>
));

export default FeedHeader;