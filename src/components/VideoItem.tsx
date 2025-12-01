// src/components/VideoItem.tsx

import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { VideoItemProps } from '../constants/interfaces';
import InteractionButton from './InteractionButton';
import { toggleLikeForCurrentUser } from '../services/userLikesService';

const VideoItem: React.FC<VideoItemProps> = React.memo(({ uri, content, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(content.likes.replace('K', '000').replace('M', '000000')) || 0);

  /** Tocar para pausar/reanudar */
  const handleVideoPress = useCallback(() => {
    setPaused(prev => !prev);
  }, []);

  const handleLikePress = useCallback(async () => {
    if (!content.id) {
      console.error('Video ID no definido');
      return;
    }

    try {
      const newLikeStatus = await toggleLikeForCurrentUser(content.id);
      setLiked(newLikeStatus);
      // Actualizar el contador visualmente
      if (newLikeStatus) {
        setLikeCount(prev => prev + 1);
      } else {
        setLikeCount(prev => Math.max(0, prev - 1));
      }
    } catch (error: any) {
      console.error('Error al dar like:', error);
      if (error.message === 'Usuario no autenticado') {
        Alert.alert('Inicia sesión', 'Debes iniciar sesión para dar like a los videos');
      } else {
        Alert.alert('Error', 'No se pudo completar la acción');
      }
    }
  }, [content.id]);

  /**
   * Maneja la reproducción cuando:
   * - el usuario cambia de pestaña
   * - el usuario hace scroll
   * - el usuario pausa manualmente
   */
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive && !paused) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  }, [isActive, paused]);

  /**
   * Limpieza al desmontar:
   * - Evita fugas de memoria
   * - Detiene completamente el video cuando el item sale del árbol
   */
  useEffect(() => {
    return () => {
      videoRef.current?.stopAsync();
    };
  }, []);

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handleVideoPress}
      activeOpacity={1}
    >
      <Video
        ref={videoRef}
        style={[styles.video, { width: '100%', height: '100%' }]}
        source={uri}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted={false}
        shouldPlay={isActive && !paused}
        useNativeControls={false}
      />

      {/* Icono de play cuando está en pausa */}
      {paused && (
        <View style={styles.playButtonContainer}>
          <Ionicons name="play" size={80} color="rgba(255, 255, 255, 0.6)" />
        </View>
      )}

      {/* Gradiente inferior */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
        style={styles.gradient}
      />

      {/* Botones y avatar (lado derecho) */}
      <View style={styles.interactionContainer}>
        <InteractionButton 
          iconName="heart" 
          count={formatLikeCount(likeCount)} 
          iconType="Ionicons" 
          onPress={handleLikePress}
          isActive={liked}
          videoId={content.id}
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

        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.musicIcon}
        />
      </View>

      {/* Usuario + descripción + música */}
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

// Función auxiliar para formatear el conteo de likes
const formatLikeCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

export default VideoItem;