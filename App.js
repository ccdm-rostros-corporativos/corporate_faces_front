import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from './src/core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { HomeNavigation, SearchNavigation } from './CustomNavigation';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          backBehaviour="Home"
          tabBarOptions={{
            activeTintColor: '#1e90ff',
            inactiveTintColor: 'white',
            activeBackgroundColor: theme.colors.secondary,
            inactiveBackgroundColor: theme.colors.secondary,
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

              let iconName = ''
              switch (route.name) {
                case 'Inicio':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Dashboardos':
                  iconName = focused ? 'person-circle' : 'person-circle-outline';
                  break;
              }

              return <Icon name={iconName} size={size} color={color} />
            }
          })}
        >
          <Tab.Screen name="Inicio" component={HomeNavigation} />
          <Tab.Screen name="Dashboardos" component={SearchNavigation} />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
