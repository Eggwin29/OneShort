import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Animated, // Importamos Animated para la animación
  Easing, // Importamos Easing para un mejor control de la animación
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

// Interfaces
interface ContentData {
  username: string;
  description: string;
  likes: string;
  comments: string;
}

interface InteractionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap | keyof typeof Feather.glyphMap;
  count: string;
  iconType?: 'Ionicons' | 'Feather';
}

// Datos constantes
const VIDEOLIST = [
  require('./assets/videos/videotest1.mp4'),
  require('./assets/videos/videotest2.mp4'),
  require('./assets/videos/videotest3.mp4'),
];

const OVERLAY_DATA: ContentData[] = [
  {
    username: '@frieren_anime',
    description: 'Sisi, abuela, Himmel era todo un heroe, ya comase su avena.',
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

// Componente InteractionButton optimizado
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

// Componente VideoItem optimizado
const VideoItem: React.FC<{
  uri: number;
  content: ContentData;
  isActive: boolean;
}> = React.memo(({ uri, content, isActive }) => {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);

  const handleVideoPress = useCallback(() => {
    setPaused(prev => !prev);
  }, []);

  React.useEffect(() => {
    if (!videoRef.current) return;
    
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
        <Image
          source={require('./assets/images/logo.png')}
          style={styles.musicIcon}
        />
      </View>

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

const FeedScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const [data, setData] = useState(VIDEOLIST);
  const [loading, setLoading] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current; // Valor de animación para la rotación

  // 🌀 Lógica de Animación para el icono de carga
  const startRotation = useCallback(() => {
    rotateAnim.setValue(0);
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000, // Una vuelta por segundo
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  React.useEffect(() => {
    if (loading) {
      startRotation();
    } else {
      rotateAnim.stopAnimation();
    }
    // La animación debe detenerse cuando loading cambia a false
    return () => rotateAnim.stopAnimation();
  }, [loading, rotateAnim, startRotation]);

  // Interpolación para mapear el valor de 0 a 1 a 0deg a 360deg
  const rotateData = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const maxOffset = contentSize.height - layoutMeasurement.height;

    // Lógica para añadir más videos si se llega al final
    if (currentOffset >= maxOffset - 10) {
      setData(prevData => [...prevData, ...VIDEOLIST]);
    }
  }, []);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
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
  }, [data.length]);

  // Manejador para el logo: reinicia el feed
  const handleLogoPress = useCallback(() => {
    setLoading(true); // 1. Activa el indicador de carga y la rotación
    
    // Pequeño retardo para simular una 'carga' visual
    setTimeout(() => {
      // 2. Desplaza la lista al primer elemento (índice 0) sin animación
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
      // 3. Establece el índice activo en 0
      setCurrentIndex(0);
      // 4. Desactiva el indicador de carga
      setLoading(false);
    }, 400); // 400ms de "carga"
  }, []);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  }), []);

  const renderItem = useCallback(({ item, index }: { item: number, index: number }) => {
    const contentIndex = index % OVERLAY_DATA.length;
    const content = OVERLAY_DATA[contentIndex];

    return (
      <VideoItem 
        uri={item} 
        content={content} 
        isActive={index === currentIndex}
      />
    );
  }, [currentIndex]);

  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);

  const flatListProps = useMemo(() => ({
    ref: flatListRef,
    pagingEnabled: true,
    data,
    horizontal: false,
    showsVerticalScrollIndicator: false,
    keyExtractor,
    renderItem,
    onScroll: handleScroll,
    onMomentumScrollEnd: handleMomentumScrollEnd,
    getItemLayout,
    initialNumToRender: 3,
    maxToRenderPerBatch: 3,
    windowSize: 5,
  }), [data, keyExtractor, renderItem, handleScroll, handleMomentumScrollEnd, getItemLayout]);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoButton}
          onPress={handleLogoPress} // Evento al presionar el logo
          activeOpacity={0.8}
        >
          <Image
            source={require('./assets/images/logo.png')}
            style={styles.logoIcon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerTextInactive}>Tu perfil</Text>
        </TouchableOpacity>
        <Text style={styles.headerTextDivider}>|</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerTextActive}>Para Ti</Text>
        </TouchableOpacity>
      </View>

      <FlatList {...flatListProps} />

      {/* Indicador de Carga (Overlay Animado) */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
            <Ionicons name="refresh" size={50} color="white" />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <FeedScreen />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  itemContainer: {
    width,
    height,
    position: 'relative',
  },
  video: { 
    width,
    height,
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: 55
  },
  logoButton: { // Área táctil para el logo
    position: 'absolute',
    left: 0,
    top: 0,
    width: 65, 
    height: 55,
    zIndex: 22, 
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  logoIcon: {
    // position: 'absolute' ya no es necesario aquí, está dentro de logoButton
    left: 10,
    zIndex: 21,
    width: 45,
    height: 45,
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
  interactionContainer: {
    position: 'absolute',
    bottom: 120,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentInfo: {
    position: 'absolute',
    bottom: 50,
    left: 15,
    right: 120,
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.3,
    zIndex: 1,
  },
  loadingOverlay: { // Estilo del Overlay de Carga
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, 
  },
});