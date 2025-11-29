// src/components/InteractionButton.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { InteractionButtonProps } from '../constants/interfaces';

/**
 * Componente para los botones de interacción como "Me gusta" o "Comentarios".
 */
const InteractionButton: React.FC<InteractionButtonProps> = React.memo(({
  iconName,
  count,
  iconType = 'Ionicons',
}) => (
  <TouchableOpacity style={styles.interactionButton}>
    {iconType === 'Ionicons' ? (
      <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={30} color="white" />
    ) : (
      <Feather name={iconName as keyof typeof Feather.glyphMap} size={30} color="white" />
    )}
    <Text style={styles.interactionCount}>{count}</Text>
  </TouchableOpacity>
));

export default InteractionButton;