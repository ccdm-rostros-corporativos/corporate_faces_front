import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Dashboard from '../screens/Dashboard';
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export const BottomTab = () => {

  return (
    <Tab.Navigator
      backBehaviour = "initialRoute"
      tabBarOptions={{
        activeTintColor: '#1e90ff',
        inactiveTintColor: 'white',
        activeBackgroundColor: theme.colors.secondary,
        inactiveBackgroundColor: theme.colors.secondary,
      }}
      screenOptions={ ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {

          let iconName = ''
          switch( route.name ) {
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
      <Tab.Screen name="Inicio" component={Dashboard} />
      <Tab.Screen name="Dashboardos" component={Dashboard} />
    </Tab.Navigator>
  )

}
