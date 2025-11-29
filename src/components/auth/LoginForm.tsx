// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { AuthFormProps } from '../../constants/interfaces';
import { loginUser } from '../../services/firebaseService';
import AuthLoadingOverlay from '../AuthLoadingOverlay';

/**
 * Formulario de inicio de sesión.
 */
const LoginForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese correo y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      // Iniciar sesión con Firebase
      await loginUser(email, password);
      
      Alert.alert(
        '¡Bienvenido!', 
        'Has iniciado sesión correctamente.',
        [{ text: 'OK', onPress: onSuccess }]
      );
    } catch (error: any) {
      Alert.alert('Error de Inicio de Sesión', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.fin}>
      <AuthLoadingOverlay visible={isLoading} message="Iniciando sesión..." />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[styles.authButton, isLoading && { opacity: 0.6 }]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.authButtonText}>
          {isLoading ? 'Iniciando sesión...' : 'Entrar al Mundo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;