// src/components/InteractionButton.tsx

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { InteractionButtonProps } from '../constants/interfaces';
import { checkIfCurrentUserLikedVideo } from '../services/userLikesService';

/**
 * Componente para los botones de interacción como "Me gusta" o "Comentarios".
 * Versión corregida que mantiene compatibilidad con el código existente.
 */
const InteractionButton: React.FC<InteractionButtonProps> = React.memo(({
  iconName,
  count,
  iconType = 'Ionicons',
  onPress,
  isActive = false,
  videoId
}) => {
  const [isLiked, setIsLiked] = useState(isActive);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar estado inicial del like solo si tenemos videoId
    const loadLikeStatus = async () => {
      if (videoId && iconName === 'heart') {
        setLoading(true);
        try {
          const liked = await checkIfCurrentUserLikedVideo(videoId);
          setIsLiked(liked);
        } catch (error) {
          console.error('Error loading like status:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadLikeStatus();
  }, [videoId, iconName]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    
    // Si es el botón de like, actualizamos el estado visual
    if (iconName === 'heart' && videoId) {
      setIsLiked(!isLiked);
    }
  };

  // Determinar el color del icono
  const iconColor = iconName === 'heart' && isLiked ? '#FF3040' : 'white';

  // Función para formatear números (K, M)
  const formatLikeCount = (num: number | string): string => {
    if (typeof num === 'number') {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    }
    return num; // Si ya es string, devolverlo tal cual
  };

  if (loading && iconName === 'heart') {
    return (
      <TouchableOpacity style={styles.interactionButton} disabled>
        <ActivityIndicator size="small" color="white" />
        <Text style={styles.interactionCount}>{formatLikeCount(count)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.interactionButton} onPress={handlePress}>
      {iconType === 'Ionicons' ? (
        <Ionicons 
          name={iconName as keyof typeof Ionicons.glyphMap} 
          size={30} 
          color={iconColor} 
        />
      ) : (
        <Feather 
          name={iconName as keyof typeof Feather.glyphMap} 
          size={30} 
          color={iconColor}
        />
      )}
      <Text style={styles.interactionCount}>{formatLikeCount(count)}</Text>
    </TouchableOpacity>
  );
});

export default InteractionButton;