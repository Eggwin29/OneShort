// src/components/VideoItem.tsx

import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { VideoItemProps } from '../constants/interfaces';
import InteractionButton from './InteractionButton';

/**
 * Componente que muestra un video con su información de usuario, descripción y botones de interacción.
 */
const VideoItem: React.FC<VideoItemProps> = React.memo(({ uri, content, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);

  const handleVideoPress = useCallback(() => {
    setPaused(prev => !prev);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    
    // Controlar la reproducción basado en si el item está visible (isActive) y si el usuario lo pausó
    if (isActive && !paused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  }, [isActive, paused]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handleVideoPress} activeOpacity={1}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={uri}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted={false}
        shouldPlay={isActive && !paused}
        useNativeControls={false}
      />

      {paused && (
        <View style={styles.playButtonContainer}>
          <Ionicons name="play" size={80} color="rgba(255, 255, 255, 0.6)" />
        </View>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
        style={styles.gradient}
      />

      {/* Contenedor de Interacción (Derecha) */}
      <View style={styles.interactionContainer}>
        <InteractionButton
          iconName="heart"
          count={content.likes}
          iconType="Ionicons"
        />
        <InteractionButton
          iconName="message-square"
          count={content.comments}
          iconType="Feather"
        />
        <InteractionButton
          iconName="share"
          count="Compartir"
          iconType="Feather"
        />
        {/* Icono de Música (Rotatorio en tu código original) */}
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.musicIcon}
        />
      </View>

      {/* Información del Contenido (Izquierda/Abajo) */}
      <View style={styles.contentInfo}>
        <Text style={styles.username}>{content.username}</Text>
        <Text style={styles.description}>{content.description}</Text>
        <View style={styles.musicRow}>
          <FontAwesome5 name="music" size={12} color="white" />
          <Text style={styles.musicText}>Música Original</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default VideoItem;