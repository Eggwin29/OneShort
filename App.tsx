import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
// Asegúrate de tener: expo install @expo/vector-icons
// Para el gradiente: expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';

const imageList = [
  require('./assets/images/frieren-test.jpg'),
  require('./assets/images/frieren-test2.jpg'),
  require('./assets/images/frieren-test3.jpg'),
];

const overlayData = [
  {
    username: '@frieren_anime',
    description: 'La maga Frieren en su viaje de más de mil años. Un viaje que vale la pena.',
    likes: '120.5K',
    comments: '4.2K',
  },
  {
    username: '@himel_hero',
    description: 'Recuerdos del héroe Himmel. ¡Nunca olvidaremos al valiente grupo!',
    likes: '300K',
    comments: '8.1K',
  },
  {
    username: '@fern_magic',
    description: 'Fern, la aprendiz de Frieren, mostrando su poder. El futuro de la magia.',
    likes: '450.2K',
    comments: '15.5K',
  },
];

const { height, width } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <FeedScreen />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const InteractionButton = ({ iconName, count, iconType = 'Ionicons' }) => (
  <TouchableOpacity style={styles.interactionButton}>
    {iconType === 'Ionicons' && (
      <Ionicons name={iconName} size={30} color="white" />
    )}
    {iconType === 'Feather' && (
      <Feather name={iconName} size={30} color="white" />
    )}
    <Text style={styles.interactionCount}>{count}</Text>
  </TouchableOpacity>
);

const FeedScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [data, setData] = useState(imageList);

  // Scroll infinito - MANTENIDO IGUAL
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const maxOffset = contentSize.height - layoutMeasurement.height;

    if (currentOffset >= maxOffset - 10) {
      setData((prevData) => [...prevData, ...imageList]);
    }
  };

  // Manejo del fin del scroll - MANTENIDO IGUAL
  const handleMomentumScrollEnd = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const index = Math.floor(contentOffset.y / layoutMeasurement.height);

    if (index >= data.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
        setCurrentIndex(0);
      }, 100);
    } else {
      setCurrentIndex(index);
    }
  };

  const getItemLayout = (_, index) => ({
    length: height,
    offset: height * index,
    index,
  });

  return (
    <View style={styles.container}>
      {/* HEADER DE NAVEGACIÓN (similar a TikTok/Reels) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerTextInactive}>Siguiendo</Text>
        </TouchableOpacity>
        <Text style={styles.headerTextDivider}>|</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerTextActive}>Para Ti</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        pagingEnabled
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const contentIndex = index % overlayData.length;
          const content = overlayData[contentIndex];

          return (
            <View style={styles.itemContainer}>
              {/* Imagen/Video */}
              <Image source={item} style={styles.image} />

              {/* Degradado en la parte inferior para legibilidad del texto */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
                style={styles.gradient}
              />

              {/* Botones de Interacción a la Derecha */}
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
                {/* Imagen/Icono del usuario para música/sonido */}
                <Image
                  source={require('./assets/images/logo.png')} // O un icono de música
                  style={styles.musicIcon}
                />
              </View>

              {/* Información del contenido a la Izquierda/Abajo */}
              <View style={styles.contentInfo}>
                <Text style={styles.username}>{content.username}</Text>
                <Text style={styles.description}>{content.description}</Text>
                <View style={styles.musicRow}>
                  <FontAwesome5 name="music" size={12} color="white" />
                  <Text style={styles.musicText}>Música Original</Text>
                </View>
              </View>
            </View>
          );
        }}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro
  },
  itemContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  // --- Estilos de Header ---
  header: {
    position: 'absolute',
    top: 50, // Ajustar según el safe area
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerTextActive: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTextInactive: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontWeight: '500',
  },
  headerTextDivider: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 18,
    marginHorizontal: 5,
  },
  searchButton: {
    position: 'absolute',
    right: 20,
  },
  // --- Estilos de Interacción Derecha ---
  interactionContainer: {
    position: 'absolute',
    bottom: 120, // Ajustado para dejar espacio para la descripción
    right: 10,
    zIndex: 15,
    alignItems: 'center',
  },
  interactionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  interactionCount: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  musicIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', // Simula un icono de música
    // Aquí puedes agregar un estilo de rotación si quisieras simular el disco
  },
  // --- Estilos de Contenido/Descripción Inferior ---
  contentInfo: {
    position: 'absolute',
    bottom: 50, // Más bajo para parecerse a Reels/TikTok
    left: 15,
    right: 120, // Deja espacio para los botones de interacción
    zIndex: 15,
  },
  username: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    marginBottom: 8,
    // Sombra para mejor legibilidad sobre el degradado
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  // --- Estilo del Gradiente ---
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.3, // Cubre el 30% inferior de la pantalla
    zIndex: 1, // Por debajo del texto y botones (que tienen zIndex > 1)
  },
});