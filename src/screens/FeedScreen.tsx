// src/screens/FeedScreen.tsx
import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Easing,
} from 'react-native';
import { styles } from '../styles/styles';
import { VIDEOLIST, OVERLAY_DATA } from '../constants/data';
import VideoItem from '../components/VideoItem';
import FeedHeader from '../components/FeedHeader';
import LoadingOverlay from '../components/LoadingOverlay';

const { height } = Dimensions.get('window');

interface FeedScreenProps {
  onNavigateToProfile: () => void;
  onNavigateToFeed: () => void;
}

/**
 * Componente principal de la pantalla de Feed (similar a TikTok).
 * Contiene la FlatList, la lógica de paginación y la gestión de videos activos.
 */
const FeedScreen: React.FC<FeedScreenProps> = ({ 
  onNavigateToProfile, 
  onNavigateToFeed 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<number>>(null);
  const [data, setData] = useState<number[]>(VIDEOLIST);
  const [loading, setLoading] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // --- Lógica de Animación y Carga ---

  const startRotation = useCallback(() => {
    rotateAnim.setValue(0);
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
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
    return () => rotateAnim.stopAnimation();
  }, [loading, rotateAnim, startRotation]);

  const rotateData: Animated.AnimatedInterpolation<string> = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // --- Lógica de Scroll y FlatList ---

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const maxOffset = contentSize.height - layoutMeasurement.height;

    if (currentOffset >= maxOffset - 10 && !loading) {
      setData(prevData => [...prevData, ...VIDEOLIST]);
    }
  }, [loading]);

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

  const handleLogoPress = useCallback(() => {
    setLoading(true);
    
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
      setCurrentIndex(0);
      setLoading(false);
    }, 400);
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
      <FlatList {...flatListProps} />

      {/* Encabezado fijo sobre la FlatList */}
      <FeedHeader 
        onLogoPress={handleLogoPress}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToFeed={onNavigateToFeed}
        currentScreen="feed"
      />

      {/* Indicador de Carga (Overlay Animado) */}
      {loading && <LoadingOverlay rotateData={rotateData} />}
    </View>
  );
};

export default FeedScreen;