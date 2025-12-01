// src/screens/ProfileScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { getCurrentUser } from "../services/firebaseService";
import { imageList } from "../constants/data";
import { saveProfileImage, getProfileImage } from "../services/userProfileService";
import { getCurrentUserLikedVideos } from "../services/userLikesService";

const { width } = Dimensions.get("window");

interface ProfileScreenProps {
  onBackToFeed: () => void;
}

interface VideoItem {
  id: string;
  thumbnail: any;
  likes: number;
  title?: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBackToFeed }) => {
  const [activeTab, setActiveTab] = useState<"videos" | "likes">("videos");
  const [selectedProfileImage, setSelectedProfileImage] = useState(imageList[0].path);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "Cargando...",
    email: "",
    followers: "1.2K",
    following: "245",
    likes: "45.6K",
    bio: "✨ Cargando información... ✨",
  });

  const [userVideos, setUserVideos] = useState<VideoItem[]>([
    {
      id: "video_1",
      thumbnail: require("../../assets/images/thumbnails/thumbnail1.jpg"),
      likes: 850000,
      title: "Levi limpiando todo a su paso"
    },
    {
      id: "video_2",
      thumbnail: require("../../assets/images/thumbnails/thumbnail2.jpg"),
      likes: 1200000,
      title: "Luffy Gear 5"
    },
    {
      id: "video_3",
      thumbnail: require("../../assets/images/thumbnails/thumbnail3.jpg"),
      likes: 720000,
      title: "Tanjiro vs Rui"
    },
    {
      id: "video_4",
      thumbnail: require("../../assets/images/thumbnails/thumbnail4.jpg"),
      likes: 980000,
      title: "Goatjo regresa"
    },
    {
      id: "video_5",
      thumbnail: require("../../assets/images/thumbnails/thumbnail5.jpg"),
      likes: 610000,
      title: "Chainsaw Man"
    },
    {
      id: "video_6",
      thumbnail: require("../../assets/images/thumbnails/thumbnail6.jpg"),
      likes: 550000,
      title: "Spy x Family"
    }, 
    {
      id: "video_7",
      thumbnail: require("../../assets/images/thumbnails/thumbnail7.jpg"),
      likes: 430000,
      title: "Blue Lock"
    }
  ]);

  const [likedVideos, setLikedVideos] = useState<VideoItem[]>([]);
  const [isLoadingLikedVideos, setIsLoadingLikedVideos] = useState(false);

  useEffect(() => {
    loadUserData();
    loadSavedProfileImage();
  }, []);

  const loadUserData = () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      const username =
        currentUser.displayName ||
        currentUser.email?.split("@")[0] ||
        "Usuario";

      const email = currentUser.email || "";

      setUserData(prev => ({
        ...prev,
        username,
        email,
        bio: `✨ ${username} compartiendo contenido increíble ✨`,
      }));
    }
  };

  const loadSavedProfileImage = async () => {
    const savedId = await getProfileImage();
    if (!savedId) return;

    const found = imageList.find((img) => img.id === savedId);
    if (found) setSelectedProfileImage(found.path);
  };

  const loadLikedVideos = async () => {
    setIsLoadingLikedVideos(true);
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const likedVideoIds = await getCurrentUserLikedVideos();
        
        // Mapa de video IDs a títulos (basado en tu OVERLAY_DATA)
        const videoTitles: Record<string, string> = {
          'video_1': 'Levi limpiando todo a su paso',
          'video_2': 'Luffy usando el Gear 5',
          'video_3': 'Tanjiro vs Rui - Danza del dios del fuego',
          'video_4': 'Goatjo despertando después del sello',
          'video_5': 'Denji transformándose en Chainsaw Man',
          'video_6': 'Anya confusión con Loid y Yor',
          'video_7': 'Isagi decidiendo el partido',
        };
        
        // Mapa de video IDs a thumbnails
        const videoThumbnails: Record<string, any> = {
          'video_1': require("../../assets/images/thumbnails/thumbnail1.jpg"),
          'video_2': require("../../assets/images/thumbnails/thumbnail2.jpg"),
          'video_3': require("../../assets/images/thumbnails/thumbnail3.jpg"),
          'video_4': require("../../assets/images/thumbnails/thumbnail4.jpg"),
          'video_5': require("../../assets/images/thumbnails/thumbnail5.jpg"),
          'video_6': require("../../assets/images/thumbnails/thumbnail6.jpg"),
          'video_7': require("../../assets/images/thumbnails/thumbnail7.jpg"),
        };
        
        // Convertir IDs a objetos de video con información
        const videosData: VideoItem[] = likedVideoIds.map(videoId => {
          const thumbnail = videoThumbnails[videoId] || require("../../assets/images/logo.png");
          const title = videoTitles[videoId] || 'Video gustado';
          
          return {
            id: videoId,
            thumbnail: thumbnail,
            likes: Math.floor(Math.random() * 15000), // Número aleatorio temporal
            title: title
          };
        });
        
        setLikedVideos(videosData);
      }
    } catch (error) {
      console.error('Error loading liked videos:', error);
    } finally {
      setIsLoadingLikedVideos(false);
    }
  };

  const handleSelectImage = async (item: any) => {
    setSelectedProfileImage(item.path);
    setShowModal(false);
    await saveProfileImage(item.id);
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity style={styles.profileVideoItem}>
      <Image source={item.thumbnail} style={styles.profileVideoThumbnail} />
      <View style={styles.profileVideoOverlay}>
        <Ionicons name="heart" size={16} color="white" />
        <Text style={styles.profileVideoLikes}>
          {item.likes >= 1000000 ? `${(item.likes / 1000000).toFixed(1)}M` : 
           item.likes >= 1000 ? `${(item.likes / 1000).toFixed(1)}K` : 
           item.likes.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    const data = activeTab === "videos" ? userVideos : likedVideos;
    
    if (activeTab === "likes" && isLoadingLikedVideos) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
          <ActivityIndicator size="large" color="#ffc95e" />
          <Text style={{ color: 'white', marginTop: 10 }}>Cargando videos gustados...</Text>
        </View>
      );
    }
    
    if (activeTab === "likes" && data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
          <Ionicons name="heart-outline" size={60} color="rgba(255,255,255,0.3)" />
          <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 10, fontSize: 16 }}>
            Aún no has dado like a ningún video
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 5, fontSize: 14 }}>
            Los videos que des like aparecerán aquí
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.profileVideosGrid}>
        <FlatList
          data={data}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.profileContainer}>
      {/* HEADER */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={onBackToFeed}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.profileHeaderTitle}>Perfil</Text>
        <TouchableOpacity style={styles.profileSettingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.profileScrollView}>
        <View style={styles.profileInfoSection}>
          <View style={styles.profileTopSection}>
            {/* FOTO DE PERFIL */}
            <View style={styles.profileImageContainer}>
              <Image source={selectedProfileImage} style={styles.profileImage} />

              <TouchableOpacity
                style={styles.profileEditButton}
                onPress={() => setShowModal(true)}
              >
                <Feather name="edit-2" size={14} color="white" />
              </TouchableOpacity>
            </View>

            {/* STATS */}
            <View style={styles.profileStats}>
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>{userVideos.length}</Text>
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
              <View style={styles.profileStat}>
                <Text style={styles.profileStatNumber}>{likedVideos.length}</Text>
                <Text style={styles.profileStatLabel}>Gustados</Text>
              </View>
            </View>
          </View>

          {/* BIO */}
          <View style={styles.profileBioSection}>
            <Text style={styles.profileUsername}>@{userData.username}</Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>
            <Text style={styles.profileBio}>{userData.bio}</Text>
          </View>

          {/* BOTONES */}
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.profileEditProfileButton}>
              <Text style={styles.profileEditProfileText}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileShareButton}>
              <Feather name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.profileTabs}>
          <TouchableOpacity
            style={[
              styles.profileTab,
              activeTab === "videos" && styles.profileTabActive,
            ]}
            onPress={() => setActiveTab("videos")}
          >
            <MaterialIcons
              name="video-library"
              size={24}
              color={activeTab === "videos" ? "#ffc95e" : "rgba(255,255,255,0.5)"}
            />
            <Text
              style={[
                styles.profileTabText,
                activeTab === "videos" && styles.profileTabTextActive,
              ]}
            >
              Videos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.profileTab,
              activeTab === "likes" && styles.profileTabActive,
            ]}
            onPress={() => {
              setActiveTab("likes");
              loadLikedVideos();
            }}
          >
            <Ionicons
              name="heart"
              size={24}
              color={activeTab === "likes" ? "#ffc95e" : "rgba(255,255,255,0.5)"}
            />
            <Text
              style={[
                styles.profileTabText,
                activeTab === "likes" && styles.profileTabTextActive,
              ]}
            >
              Gustados ({likedVideos.length})
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecciona tu foto</Text>

            <FlatList
              data={imageList}
              numColumns={3}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              style={{ maxHeight: 300 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalImageWrapper}
                  onPress={() => handleSelectImage(item)}
                >
                  <Image source={item.path} style={styles.modalImage} />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;