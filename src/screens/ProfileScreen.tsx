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
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { getCurrentUser } from '../services/firebaseService';
import { imageList } from '../constants/data';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
  onBackToFeed: () => void;
}

const defaultProfileImage = imageList[0].path;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBackToFeed }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'likes'>('videos');

  // Imagen seleccionada por el usuario
  const [profileImage, setProfileImage] = useState<any>(defaultProfileImage);

  const [userData, setUserData] = useState({
    username: 'Cargando...',
    email: '',
    followers: '0',
    following: '0',
    likes: '0',
    bio: '✨ Cargando información... ✨',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      const username =
        currentUser.displayName ||
        currentUser.email?.split('@')[0] ||
        'Usuario';

      const email = currentUser.email || '';

      setUserData({
        username,
        email,
        followers: '1.2K',
        following: '245',
        likes: '45.6K',
        bio: email
          ? `✨ ${username} compartiendo contenido increíble ✨`
          : '✨ Creando contenido increíble ✨',
      });
    } else {
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

  // ------------------------------
  //       CAMBIAR FOTO PERFIL
  // ------------------------------
  const pickProfileImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Necesitas otorgar acceso a tu galería.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // cuadrado estilo TikTok
        quality: 0.9,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      console.log('Error al seleccionar imagen:', error);
    }
  };

  // ------------------------------
  //         VIDEOS EJEMPLO
  // ------------------------------
  const userVideos = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    thumbnail: `https://picsum.photos/seed/${i + 100}/200/300`,
    likes: Math.floor(Math.random() * 10000),
  }));

  const likedVideos = Array.from({ length: 8 }, (_, i) => ({
    id: `liked_${i}`,
    thumbnail: `https://picsum.photos/seed/${i + 200}/200/300`,
    likes: Math.floor(Math.random() * 15000),
  }));

  const renderVideoItem = ({ item }: any) => (
    <TouchableOpacity style={styles.profileVideoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.profileVideoThumbnail} />
      <View style={styles.profileVideoOverlay}>
        <Ionicons name="heart" size={16} color="white" />
        <Text style={styles.profileVideoLikes}>{item.likes}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.profileContainer}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={onBackToFeed}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.profileHeaderTitle}>Perfil</Text>
        <TouchableOpacity style={styles.profileSettingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.profileScrollView} showsVerticalScrollIndicator={false}>
        
        {/* Información del usuario */}
        <View style={styles.profileInfoSection}>
          
          {/* Foto y estadísticas */}
          <View style={styles.profileTopSection}>
            <View style={styles.profileImageContainer}>
              <Image source={profileImage} style={styles.profileImage} />

              {/* Botón cambiar foto */}
              <TouchableOpacity
                style={styles.profileEditButton}
                onPress={pickProfileImage}
              >
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

          {/* Botones */}
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.profileEditProfileButton}>
              <Text style={styles.profileEditProfileText}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileShareButton}>
              <Feather name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.profileTabs}>
          <TouchableOpacity
            style={[styles.profileTab, activeTab === 'videos' && styles.profileTabActive]}
            onPress={() => setActiveTab('videos')}
          >
            <MaterialIcons
              name="video-library"
              size={24}
              color={activeTab === 'videos' ? '#ffc95e' : 'rgba(255,255,255,0.5)'}
            />
            <Text
              style={[
                styles.profileTabText,
                activeTab === 'videos' && styles.profileTabTextActive,
              ]}
            >
              Videos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.profileTab, activeTab === 'likes' && styles.profileTabActive]}
            onPress={() => setActiveTab('likes')}
          >
            <Ionicons
              name="heart"
              size={24}
              color={activeTab === 'likes' ? '#ffc95e' : 'rgba(255,255,255,0.5)'}
            />
            <Text
              style={[
                styles.profileTabText,
                activeTab === 'likes' && styles.profileTabTextActive,
              ]}
            >
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
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
