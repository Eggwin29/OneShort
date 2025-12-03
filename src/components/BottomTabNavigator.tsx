// src/components/auth/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();
interface BottomTabNavigatorProps {
  onLogout?: () => void; // Nueva prop para manejar logout
}
export default function BottomTabNavigator({ onLogout }: BottomTabNavigatorProps) {
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
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? '#fff' : '#777'} />
          ),
        }}
      >
        {({ navigation }) => (
          <FeedScreen
            onNavigateToProfile={() => navigation.navigate('Profile')}
            onNavigateToFeed={() => navigation.navigate('Feed')}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={24} color={focused ? '#fff' : '#777'} />
          ),
        }}
      >
        {({ navigation }) => (
          <ProfileScreen
            onBackToFeed={() => navigation.navigate('Feed')}
            onLogout={onLogout} // Pasa la función de logout al ProfileScreen
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}