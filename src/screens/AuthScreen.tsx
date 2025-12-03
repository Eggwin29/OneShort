// src/screens/AuthScreen.tsx

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { styles } from '../styles/styles';
import { AuthMode } from '../constants/interfaces';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const { width } = Dimensions.get('window');

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('Login');
  // Ajustamos el valor animado para el ancho del formContainer (width - 60)
  const slideAnim = useRef(new Animated.Value(0)).current; 

  // Animación para deslizar el contenedor de formularios
  useEffect(() => {
    const formInternalWidth = width - 60;
    const toValue = mode === 'Login' ? 0 : -formInternalWidth; 
    
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mode, slideAnim]);

  // Manejador del cambio de modo
  const handleModeChange = useCallback((newMode: AuthMode) => {
    setMode(newMode);
  }, []);
  
  // Función de callback pasada a los formularios
  const handleFormSuccess = useCallback(() => {
    if (mode === 'Register') {
        // En un caso real, después del registro puedes forzar el paso a la vista de Login
        handleModeChange('Login'); 
    } else {
        // En caso de éxito de Login, entra a la aplicación
        onAuthSuccess(); 
    }
  }, [mode, onAuthSuccess, handleModeChange]);

  const formContainerWidth = (width - 60) * 2; 
  const formInternalWidth = width - 60;

  return (
    <View style={styles.authContainer}>
      <View style={styles.authTitleWrapper}>
        <Text style={styles.TitleText}>
          ONE{' '}
          <Text style={[styles.TitleTextLight]}>
            SHORT
          </Text>
        </Text>
      </View>
      
      {/* Selector de Modo (Pestañas) */}
      <View style={styles.authSelector}>
        <TouchableOpacity
          style={[styles.selectorButton, mode === 'Login' && styles.selectorButtonActive]}
          onPress={() => handleModeChange('Login')}
        >
          <Text style={[styles.selectorText, mode === 'Login' && styles.selectorTextActive]}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorButton, mode === 'Register' && styles.selectorButtonActive]}
          onPress={() => handleModeChange('Register')}
        >
          <Text style={[styles.selectorText, mode === 'Register' && styles.selectorTextActive]}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor Animado de Formularios */}
      <View style={styles.formWrapper}>
        <Animated.View
          style={[
            styles.formContainer,
            { transform: [{ translateX: slideAnim }] },
            { flexDirection: 'row', width: formContainerWidth }
          ]}
        >
          {/* Formulario de Login (Izquierda) */}
          <View style={{ width: formInternalWidth, paddingRight: 10 }}>
            <LoginForm onSuccess={handleFormSuccess} />
          </View>

          {/* Formulario de Registro (Derecha) */}
          <View style={{ width: formInternalWidth, paddingLeft: 10 }}>
            <RegisterForm onSuccess={handleFormSuccess} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default AuthScreen;