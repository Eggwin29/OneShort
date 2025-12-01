// src/services/userProfileService.ts

import { auth, database } from './firebaseService';
import { ref, get, update } from 'firebase/database';

/**
 * Guarda en Realtime Database el ID de la foto seleccionada
 */
export const saveProfileImage = async (imageId: number): Promise<void> => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = ref(database, `users/${user.uid}`);

  await update(userRef, {
    profilePicId: imageId,
    updatedAt: new Date().toISOString(),
  });

  console.log("Foto guardada en Firebase con ID", imageId);
};


/**
 * Obtiene el ID de la foto guardada en Firebase
 */
export const getProfileImage = async (): Promise<number | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = ref(database, `users/${user.uid}`);
  const snapshot = await get(userRef);

  if (!snapshot.exists()) return null;

  return snapshot.val().profilePicId ?? null;
};

