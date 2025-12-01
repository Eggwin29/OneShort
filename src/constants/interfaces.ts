// src/constants/interfaces.ts
import { Ionicons, Feather } from '@expo/vector-icons';

/**
 * Define la estructura de los datos de contenido que se muestran sobre el video.
 */
export interface ContentData {
  username: string;
  description: string;
  likes: string;  // Mantener como string
  comments: string;
  id?: string; // Nuevo: ID único para el video (opcional para compatibilidad)
}

/**
 * Propiedades para el componente InteractionButton.
 */
export interface InteractionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap | keyof typeof Feather.glyphMap;
  count: string;  // Mantener como string
  iconType?: 'Ionicons' | 'Feather';
  onPress?: () => void; // Nueva prop para manejar el clic
  isActive?: boolean; // Nueva prop para estado activo/inactivo
  videoId?: string; // Nueva prop para identificar el video
}

/**
 * Propiedades para el componente VideoItem.
 */
export interface VideoItemProps {
    uri: number;
    content: ContentData;
    isActive: boolean;
}

// --- INTERFACES PARA AUTENTICACIÓN ---

export interface AuthFormProps {
  onSuccess: () => void;
}

export type AuthMode = 'Login' | 'Register';

// --- INTERFACES PARA USUARIOS EN DATABASE ---

export interface UserData {
  username: string;
  email: string;
  password: string; // Contraseña cifrada
  createdAt: string;
  updatedAt: string;
  likedVideos?: string[]; // Nuevo: array de IDs de videos gustados
}

// --- NUEVAS INTERFACES PARA LIKES ---
export interface UserLike {
  userId: string;
  videoId: string;
  timestamp: number;
}