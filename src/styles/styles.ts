// src/styles/styles.ts

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // --- VideoItem Styles ---
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.3,
    zIndex: 1,
  },
  interactionContainer: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    zIndex: 15,
    alignItems: 'center',
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
  // --- InteractionButton Styles ---
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
  // --- FeedHeader Styles ---
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
  logoButton: {
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
  // --- LoadingOverlay Styles ---
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, 
  },
});