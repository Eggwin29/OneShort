// src/components/auth/RegisterForm.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../styles/styles';
import { AuthFormProps } from '../../constants/interfaces';

/**
 * Formulario de registro de nuevo usuario.
 */
const RegisterForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Aquí iría la llamada a la API de Registro
    console.log('Intentando Registro con:', { username, email, password });

    // Simulación de éxito
    Alert.alert('¡Cuenta Creada!', 'Ahora puedes iniciar sesión.');
    onSuccess(); // O quizás onSuccess solo lleva a la pantalla de login en un caso real.
  };

  return (
    <View style={styles.fin}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña (Mín. 6 caracteres)"
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.authButton} onPress={handleRegister}>
        <Text style={styles.authButtonText}>Encender la Luz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;