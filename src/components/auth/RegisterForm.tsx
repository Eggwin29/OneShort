// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { AuthFormProps } from '../../constants/interfaces';
import { registerUser } from '../../services/firebaseService';
import AuthLoadingOverlay from '../AuthLoadingOverlay';

/**
 * Formulario de registro de nuevo usuario.
 */
const RegisterForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // Registrar usuario con Firebase
      await registerUser(email, password, username);
      
      Alert.alert(
        '¡Cuenta Creada!', 
        `Bienvenido ${username}. Tu cuenta ha sido creada exitosamente.`,
        [{ text: 'OK', onPress: onSuccess }]
      );
    } catch (error: any) {
      Alert.alert('Error de Registro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.fin}>
      <AuthLoadingOverlay visible={isLoading} message="Creando tu cuenta..." />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        editable={!isLoading}
      />
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
        placeholder="Contraseña (Mín. 6 caracteres)"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[styles.authButton, isLoading && { opacity: 0.6 }]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.authButtonText}>
          {isLoading ? 'Creando cuenta...' : 'Encender la Luz'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;