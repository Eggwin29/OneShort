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

const VideoItem: React.FC<VideoItemProps> = React.memo(({ uri, content, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);

  /** Tocar para pausar/reanudar */
  const handleVideoPress = useCallback(() => {
    setPaused(prev => !prev);
  }, []);

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
        <InteractionButton iconName="heart" count={content.likes} iconType="Ionicons" />
        <InteractionButton iconName="message-square" count={content.comments} iconType="Feather" />
        <InteractionButton iconName="share" count="Compartir" iconType="Feather" />

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

export default VideoItem;
