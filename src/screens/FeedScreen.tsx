// src/screens/FeedScreen.tsx
import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Easing,
  StyleSheet,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VIDEOLIST, OVERLAY_DATA } from '../constants/data';
import VideoItem from '../components/VideoItem';
import FeedHeader from '../components/FeedHeader';
import LoadingOverlay from '../components/LoadingOverlay';
import { styles } from '../styles/styles';
import { useIsFocused } from '@react-navigation/native';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;


interface FeedScreenProps {
  onNavigateToProfile: () => void;
  onNavigateToFeed: () => void;
  
}

const FeedScreen: React.FC<FeedScreenProps> = ({ onNavigateToProfile, onNavigateToFeed }) => {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  // altura medida del área donde se muestra la FlatList (excluye footer/tabbar si queremos)
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // datos / index / loading / animación
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<number[]>(VIDEOLIST);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<number> | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // anim rotation
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
    if (loading) startRotation();
    else rotateAnim.stopAnimation();
    return () => rotateAnim.stopAnimation();
  }, [loading, rotateAnim, startRotation]);

  const rotateData = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  // --- Layout measurement: aquí medimos la altura real de renderizado ---
  const onContainerLayout = useCallback((e: LayoutChangeEvent) => {
    const measuredHeight = e.nativeEvent.layout.height;
    // Si el header está overlay, queremos que la lista ocupe toda la pantalla menos la tabbar y safeAreaBottom
    // pero como medimos el container real, usamos lo medido — más fiable que Dimensions.
    setContainerHeight(measuredHeight);
  }, []);

  // --- Scroll handlers ---
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const maxOffset = contentSize.height - layoutMeasurement.height;

    if (currentOffset >= maxOffset - 10 && !loading) {
      setData(prev => [...prev, ...VIDEOLIST]);
    }
  }, [loading]);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerHeight <= 0) return;
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.y / containerHeight);

    if (index >= data.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0, animated: false });
        setCurrentIndex(0);
      }, 100);
    } else {
      setCurrentIndex(index);
    }
  }, [data.length, containerHeight]);

  const handleLogoPress = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: 0, animated: false });
      setCurrentIndex(0);
      setLoading(false);
    }, 400);
  }, []);

  // getItemLayout se usa SOLO si containerHeight ya está medido (>0)
  const getItemLayout = useCallback((_: any, index: number) => {
    const len = containerHeight || 0;
    return {
      length: len,
      offset: len * index,
      index,
    };
  }, [containerHeight]);

  const renderItem = useCallback(({ item, index }: { item: number; index: number }) => {
    const contentIndex = index % OVERLAY_DATA.length;
    const content = OVERLAY_DATA[contentIndex];

    // Si containerHeight no medido aún, devolvemos un placeholder con flex:1 para no romper render.
    return (
      <View style={{ height: containerHeight || undefined, flex: containerHeight ? undefined : 1 }}>
        <VideoItem
          uri={item}
          content={content}
          isActive={index === currentIndex && isFocused}
        />
      </View>
    );
  }, [currentIndex, containerHeight, isFocused]);

  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]} onLayout={onContainerLayout}>
      {/* FlatList ocupa todo el View; containerHeight será la altura real aquí */}
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={containerHeight ? getItemLayout : undefined}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={false} // si tienes problemas con players en Android prueba true/false
        snapToInterval={containerHeight || undefined}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
      />

      {/* FeedHeader como overlay */}
      <View style={[overlayStyles.headerWrapper, { top: insets.top }]}>
        <FeedHeader
          onLogoPress={handleLogoPress}
          onNavigateToProfile={onNavigateToProfile}
          onNavigateToFeed={onNavigateToFeed}
          currentScreen="feed"
        />
      </View>

      {loading && <LoadingOverlay rotateData={rotateData} />}
    </View>
  );
};

const overlayStyles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default FeedScreen;
