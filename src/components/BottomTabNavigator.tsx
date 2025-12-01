// src/components/auth/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: TAB_BAR_HEIGHT,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#777',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreenWrapper}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? '#fff' : '#777'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenWrapper}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={24} color={focused ? '#fff' : '#777'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Wrappers para inyectar navigation props tipo callbacks sin modificar
 * demasiado tus pantallas actuales.
 */
function FeedScreenWrapper({ navigation }: any) {
  return (
    <FeedScreen
      onNavigateToProfile={() => navigation.navigate('Profile')}
      onNavigateToFeed={() => navigation.navigate('Feed')}
    />
  );
}

function ProfileScreenWrapper({ navigation }: any) {
  return (
    <ProfileScreen
      onBackToFeed={() => navigation.navigate('Feed')}
    />
  );
}
