// src/services/firebaseService.ts
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  onAuthStateChanged
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import * as Crypto from 'expo-crypto';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCP1E44xkmU0u2wSAyIRd-IWBLjRE93Ooo",
  authDomain: "edwin-db-74835.firebaseapp.com",
  databaseURL: "https://edwin-db-74835-default-rtdb.firebaseio.com",
  projectId: "edwin-db-74835",
  storageBucket: "edwin-db-74835.firebasestorage.app",
  messagingSenderId: "769386916258",
  appId: "1:769386916258:web:7251711c3488a6396deafb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Realtime Database
export const database = getDatabase(app);

/**
 * Función para cifrar la contraseña usando SHA-256
 */
export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return digest;
  } catch (error) {
    throw new Error('Error al cifrar la contraseña');
  }
};

/**
 * Guarda los datos del usuario en Realtime Database
 */
export const saveUserToDatabase = async (
  userId: string,
  username: string,
  email: string,
  encryptedPassword: string
): Promise<void> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    
    await set(userRef, {
      username: username,
      email: email,
      password: encryptedPassword, // Contraseña cifrada
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('Usuario guardado en Realtime Database');
  } catch (error: any) {
    throw new Error('Error al guardar usuario en la base de datos: ' + error.message);
  }
};

/**
 * Registra un nuevo usuario con email, contraseña y nombre de usuario
 * Guarda en Authentication Y Realtime Database
 */
export const registerUser = async (
  email: string, 
  password: string, 
  username: string
): Promise<UserCredential> => {
  try {
    // 1. Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Actualizar el perfil con el nombre de usuario
    await updateProfile(userCredential.user, {
      displayName: username
    });

    // 3. Cifrar la contraseña
    const encryptedPassword = await encryptPassword(password);

    // 4. Guardar datos en Realtime Database
    await saveUserToDatabase(
      userCredential.user.uid,
      username,
      email,
      encryptedPassword
    );

    return userCredential;
  } catch (error: any) {
    let errorMessage = 'Error al registrar usuario';
    
    // Manejo de errores específicos de Firebase
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este email ya está en uso';
        break;
      case 'auth/invalid-email':
        errorMessage = 'El formato del email es inválido';
        break;
      case 'auth/weak-password':
        errorMessage = 'La contraseña es demasiado débil';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'La operación no está permitida';
        break;
      default:
        errorMessage = error.message || 'Error desconocido';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Inicia sesión con email y contraseña
 */
export const loginUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    let errorMessage = 'Error al iniciar sesión';
    
    // Manejo de errores específicos de Firebase
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'El formato del email es inválido';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Esta cuenta ha sido deshabilitada';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No existe una cuenta con este email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Credenciales inválidas';
        break;
      default:
        errorMessage = error.message || 'Error desconocido';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Obtiene los datos del usuario desde Realtime Database
 */
export const getUserFromDatabase = async (userId: string) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    // Aquí puedes implementar la lógica para obtener los datos
    // usando get() si necesitas leer los datos después
    return userRef;
  } catch (error: any) {
    throw new Error('Error al obtener usuario de la base de datos: ' + error.message);
  }
};

/**
 * Cierra la sesión actual
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error: any) {
    throw new Error('Error al cerrar sesión: ' + error.message);
  }
};

/**
 * Obtiene el usuario actualmente autenticado
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Escucha cambios en el estado de autenticación
 */
export { onAuthStateChanged };