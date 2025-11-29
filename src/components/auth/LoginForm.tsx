// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { AuthFormProps } from '../../constants/interfaces';

/**
 * Formulario de inicio de sesión.
 */
const LoginForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de validación simple
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese correo y contraseña.');
      return;
    }
    
    // Aquí iría la llamada a la API de Login
    console.log('Intentando Login con:', { email, password });

    // Simulación de éxito
    Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente.');
    onSuccess();
  };

  return (
    <View style={styles.fin}>
      <TextInput
        style={styles.input}
        placeholder="Email o Usuario"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
        <Text style={styles.authButtonText}>Entrar al Mundo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;