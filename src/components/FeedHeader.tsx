// src/components/FeedHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';

interface FeedHeaderProps {
  onLogoPress: () => void;
}

/**
 * Componente de encabezado que incluye el logo y los botones "Tu perfil" y "Para Ti".
 */
const FeedHeader: React.FC<FeedHeaderProps> = React.memo(({ onLogoPress }) => (
  <View style={styles.header}>
    <TouchableOpacity 
      style={styles.logoButton}
      onPress={onLogoPress} // Usa la prop de onPress para la lógica de recarga
      activeOpacity={0.8}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logoIcon}
      />
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerTextInactive}>Tu perfil</Text>
    </TouchableOpacity>
    <Text style={styles.headerTextDivider}>|</Text>
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerTextActive}>Para Ti</Text>
    </TouchableOpacity>
  </View>
));

export default FeedHeader;