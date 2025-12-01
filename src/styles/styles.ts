// src/styles/styles.ts

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // --- Global Styles ---
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // --- VideoItem Styles (código existente...) ---
itemContainer: {
  // NO uses fixed height aqui
  flex: 1,
  backgroundColor: '#000',
  overflow: 'hidden',
},
video: {
  // no uses height fijo
  width: '100%',
  height: '100%',
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
  // --- ESTILOS DE AUTENTICACIÓN MODERNIZADOS ---

  // Nuevo contenedor que simula el gradiente sutil y centra mejor el contenido
  authContainer: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 30, // Más padding para un look más limpio
    justifyContent: 'center',
  },
  // Estilos de Título ya creados, pero mejor agrupados:
  authTitleWrapper: {
    marginBottom: 40,
  },
  TitleText: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8, // Reducido un poco para frescura
    textAlign: 'center',
  },
  TitleTextLight: {
    color: '#ffc95e',
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: '#ffc95e',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12, // Reducido un poco
    textAlign: 'center',
  },
  
  // Selector de Modo (Pestañas)
  authSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Separamos los botones
    marginBottom: 30,
    // Eliminamos el fondo para que los botones destaquen sobre el fondo oscuro
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 12, // Más alto
    borderRadius: 0, // Eliminamos bordes redondeados, solo usamos borde inferior
    alignItems: 'center',
    borderBottomWidth: 3, // Borde inferior para simular una pestaña
    borderColor: 'transparent', // Por defecto transparente
    marginHorizontal: 10,
  },
  selectorButtonActive: {
    borderColor: '#ffc95e', // La luz de la bombilla para el activo
  },
  selectorText: {
    color: 'rgba(255, 255, 255, 0.5)', 
    fontSize: 16,
    fontWeight: '600',
  },
  selectorTextActive: {
    color: 'white',
    fontWeight: '700',
  },
  formWrapper: {
    overflow: 'hidden',
    height: 320, // Aumentada un poco la altura para más espacio
  },
  formContainer: {
    width: width - 60, // Ancho de la vista menos el padding de 30 a cada lado
    position: 'absolute',
    top: 0,
    left: 0,
  },

  fin: {
    backgroundColor: '#ffffff2d',
    padding: 10,
    borderRadius: 10
},
  // Estilo de Input Modernizado
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Fondo muy sutil
    color: 'white',
    padding: 15,
    borderRadius: 10, // Bordes más suaves
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Borde muy tenue
  },
  // Estilo de Botón Modernizado (Primario)
  authButton: {
    backgroundColor: '#ffc95e', // Usamos el color de la bombilla (amarillo/oro)
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, // Más espacio arriba
    shadowColor: '#ffc95e', // Sombra de luz para el toque OneShot
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  authButtonText: {
    color: '#101010',
    fontSize: 18,
    fontWeight: '900', // Más negrita
  },
  logoImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 50,
  },

  // En src/styles/styles.ts, agrega al final:
loadingContainer: {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},
loadingText: {
  color: '#FFFFFF',
  marginTop: 10,
  fontSize: 16,
},
disabledButton: {
  opacity: 0.6,
},


// Agrega esto al final de src/styles/styles.ts

  // --- PROFILE SCREEN STYLES ---
  profileContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#000',
  },
  profileHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSettingsButton: {
    padding: 5,
  },
  profileScrollView: {
    flex: 1,
  },
  profileInfoSection: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  profileTopSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffc95e',
  },
  profileEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffc95e',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profileStatLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  profileBioSection: {
    marginBottom: 15,
  },
  profileUsername: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 18,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 10,
  },
  profileEditProfileButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileEditProfileText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  profileShareButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileTabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  profileTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  profileTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffc95e',
  },
  profileTabText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '600',
  },
  profileTabTextActive: {
    color: '#ffc95e',
  },
  profileVideosGrid: {
    paddingBottom: 20,
  },
  profileVideoItem: {
    width: (width - 4) / 3, // 3 columnas con separación
    aspectRatio: 3/4,
    margin: 0.5,
    position: 'relative',
  },
  profileVideoThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  profileVideoOverlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileVideoLikes: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  // En la sección de PROFILE SCREEN STYLES, agrega:
profileEmail: {
  color: 'rgba(255,255,255,0.6)',
  fontSize: 12,
  marginBottom: 8,
},

// --------------------- MODAL STYLES ---------------------
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContainer: {
  width: 300,
  backgroundColor: '#222',
  borderRadius: 20,
  padding: 20,
  maxHeight: 450,          // 👈 MUY IMPORTANTE: LIMITA ALTURA TOTAL
  alignItems: 'center',
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 15,
},

modalImageWrapper: {
  margin: 6,
  width: 70,
  height: 70,
  borderRadius: 10,
  overflow: 'hidden',
},

modalImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

modalCloseButton: {
  backgroundColor: '#ff4d4d',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 10,
  marginTop: 15,
},

modalCloseText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},


});

