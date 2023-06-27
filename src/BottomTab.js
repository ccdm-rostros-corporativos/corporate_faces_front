import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

import { theme } from './core/theme'
import { HomeNavigation, SearchNavigation, Login } from './CustomNavigation';


const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      backBehaviour="Login"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {fontSize:15},
        "tabBarActiveTintColor": "#1e90ff",
        "tabBarInactiveTintColor": "white",
        "tabBarActiveBackgroundColor": theme.colors.secondary,
        "tabBarInactiveBackgroundColor": theme.colors.secondary,
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {

          let iconName = ''
          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Búsqueda':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Inicio" component={HomeNavigation} />
      <Tab.Screen name="Búsqueda" component={SearchNavigation} />

    </Tab.Navigator>
  )
}
