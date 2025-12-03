// src/services/userLikesService.ts
import { 
  toggleLike as fbToggleLike,
  getUserLikedVideos as fbGetUserLikedVideos,
  checkIfUserLikedVideo as fbCheckIfUserLikedVideo,
  getVideoLikeCount as fbGetVideoLikeCount,
  getCurrentUser
} from './firebaseService';

// Re-exportamos las funciones
export const toggleLike = fbToggleLike;
export const getUserLikedVideos = fbGetUserLikedVideos;
export const checkIfUserLikedVideo = fbCheckIfUserLikedVideo;
export const getVideoLikeCount = fbGetVideoLikeCount;

/**
 * Función de conveniencia para manejar likes con el usuario actual
 */
export const toggleLikeForCurrentUser = async (videoId: string): Promise<boolean> => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Usuario no autenticado');
  }
  return await toggleLike(user.uid, videoId);
};

/**
 * Función de conveniencia para verificar like del usuario actual
 */
export const checkIfCurrentUserLikedVideo = async (videoId: string): Promise<boolean> => {
  const user = getCurrentUser();
  if (!user) return false;
  return await checkIfUserLikedVideo(user.uid, videoId);
};

/**
 * Función de conveniencia para obtener videos gustados del usuario actual
 */
export const getCurrentUserLikedVideos = async (): Promise<string[]> => {
  const user = getCurrentUser();
  if (!user) return [];
  return await getUserLikedVideos(user.uid);
};