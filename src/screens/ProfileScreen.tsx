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
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { getCurrentUser } from "../services/firebaseService";
import { imageList } from "../constants/data";
import { saveProfileImage, getProfileImage } from "../services/userProfileService";

const { width } = Dimensions.get("window");

interface ProfileScreenProps {
  onBackToFeed: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBackToFeed }) => {
  const [activeTab, setActiveTab] = useState<"videos" | "likes">("videos");
  const [selectedProfileImage, setSelectedProfileImage] = useState(imageList[0].path);
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    username: "Cargando...",
    email: "",
    followers: "0",
    following: "0",
    likes: "0",
    bio: "✨ Cargando información... ✨",
  });

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

      setUserData({
        username,
        email,
        followers: "1.2K",
        following: "245",
        likes: "45.6K",
        bio: `✨ ${username} compartiendo contenido increíble ✨`,
      });
    }
  };

  // Cargar foto desde Firebase
  const loadSavedProfileImage = async () => {
    const savedId = await getProfileImage();

    if (!savedId) return;

    const found = imageList.find((img) => img.id === savedId);
    if (found) setSelectedProfileImage(found.path);
  };

  // Guardar selección
  const handleSelectImage = async (item: any) => {
    setSelectedProfileImage(item.path);
    setShowModal(false);

    await saveProfileImage(item.id);
  };

  // Dummy videos
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

  const renderVideoItem = ({ item }: { item: any }) => (
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
            onPress={() => setActiveTab("likes")}
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
              Gustados
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileVideosGrid}>
          <FlatList
            data={activeTab === "videos" ? userVideos : likedVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* ------------------ MODAL ------------------ */}
      {/* ------------------ MODAL ------------------ */}
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
        style={{ maxHeight: 300 }}   // 👈 LIMITE PARA PERMITIR SCROLL
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
