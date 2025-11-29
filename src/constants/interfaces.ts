// src/constants/interfaces.ts
import { Ionicons, Feather } from '@expo/vector-icons';

/**
 * Define la estructura de los datos de contenido que se muestran sobre el video.
 */
export interface ContentData {
  username: string;
  description: string;
  likes: string;
  comments: string;
}

/**
 * Propiedades para el componente InteractionButton.
 */
export interface InteractionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap | keyof typeof Feather.glyphMap;
  count: string;
  iconType?: 'Ionicons' | 'Feather';
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
}