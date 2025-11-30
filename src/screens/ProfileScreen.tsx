// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { getCurrentUser } from '../services/firebaseService';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
  onBackToFeed: () => void;
}

/**
 * Pantalla de perfil del usuario estilo TikTok
 * Muestra los datos reales del usuario logeado
 */
const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBackToFeed }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'likes'>('videos');
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    followers: string;
    following: string;
    likes: string;
    bio: string;
  }>({
    username: 'Cargando...',
    email: '',
    followers: '0',
    following: '0',
    likes: '0',
    bio: '✨ Cargando información... ✨',
  });

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
      // Usar el displayName (username) de Firebase Auth, o el email si no hay displayName
      const username = currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuario';
      const email = currentUser.email || '';
      
      setUserData({
        username: username,
        email: email,
        followers: '1.2K', // Por ahora datos estáticos, luego podemos conectar con DB
        following: '245',
        likes: '45.6K',
        bio: email ? `✨ ${username} compartiendo contenido increíble ✨` : '✨ Creando contenido increíble ✨',
      });
    } else {
      // Fallback si no hay usuario (no debería pasar si está autenticado)
      setUserData({
        username: 'Invitado',
        email: '',
        followers: '0',
        following: '0',
        likes: '0',
        bio: '✨ Inicia sesión para ver tu perfil ✨',
      });
    }
  };

  // Videos de ejemplo - temporal
  const userVideos = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    thumbnail: `https://picsum.photos/seed/${i+100}/200/300`,
    likes: Math.floor(Math.random() * 10000),
  }));

  // Videos gustados - temporal
  const likedVideos = Array.from({ length: 8 }, (_, i) => ({
    id: `liked_${i}`,
    thumbnail: `https://picsum.photos/seed/${i+200}/200/300`,
    likes: Math.floor(Math.random() * 15000),
  }));

  const renderVideoItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.profileVideoItem}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.profileVideoThumbnail}
      />
      <View style={styles.profileVideoOverlay}>
        <Ionicons name="heart" size={16} color="white" />
        <Text style={styles.profileVideoLikes}>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.profileContainer}>
      {/* Header fijo */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={onBackToFeed}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.profileHeaderTitle}>Perfil</Text>
        <TouchableOpacity style={styles.profileSettingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.profileScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección de información del usuario */}
        <View style={styles.profileInfoSection}>
          {/* Foto de perfil y stats */}
          <View style={styles.profileTopSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://picsum.photos/seed/profile/150/150' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.profileEditButton}>
                <Feather name="edit-2" size={14} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>12</Text>
                <Text style={styles.profileStatLabel}>Videos</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>{userData.followers}</Text>
                <Text style={styles.profileStatLabel}>Seguidores</Text>
              </View>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>{userData.following}</Text>
                <Text style={styles.profileStatLabel}>Siguiendo</Text>
              </View>
            </View>
          </View>

          {/* Nombre y bio */}
          <View style={styles.profileBioSection}>
            <Text style={styles.profileUsername}>@{userData.username}</Text>
            {userData.email ? (
              <Text style={styles.profileEmail}>{userData.email}</Text>
            ) : null}
            <Text style={styles.profileBio}>{userData.bio}</Text>
          </View>

          {/* Botones de acción */}
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.profileEditProfileButton}>
              <Text style={styles.profileEditProfileText}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileShareButton}>
              <Feather name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs de navegación */}
        <View style={styles.profileTabs}>
          <TouchableOpacity 
            style={[
              styles.profileTab, 
              activeTab === 'videos' && styles.profileTabActive
            ]}
            onPress={() => setActiveTab('videos')}
          >
            <MaterialIcons 
              name="video-library" 
              size={24} 
              color={activeTab === 'videos' ? '#ffc95e' : 'rgba(255,255,255,0.5)'} 
            />
            <Text style={[
              styles.profileTabText,
              activeTab === 'videos' && styles.profileTabTextActive
            ]}>
              Videos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.profileTab, 
              activeTab === 'likes' && styles.profileTabActive
            ]}
            onPress={() => setActiveTab('likes')}
          >
            <Ionicons 
              name="heart" 
              size={24} 
              color={activeTab === 'likes' ? '#ffc95e' : 'rgba(255,255,255,0.5)'} 
            />
            <Text style={[
              styles.profileTabText,
              activeTab === 'likes' && styles.profileTabTextActive
            ]}>
              Gustados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Grid de videos */}
        <View style={styles.profileVideosGrid}>
          <FlatList
            data={activeTab === 'videos' ? userVideos : likedVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;