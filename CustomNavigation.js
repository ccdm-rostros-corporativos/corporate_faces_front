import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Dashboard from './src/screens/Dashboard';
import HeadquarterScreen from './src/screens/HeadquarterScreen';


const Stack = createStackNavigator()

export const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Dashboard} />
      <Stack.Screen name="HeadquarterScreen" component={HeadquarterScreen} />
    </Stack.Navigator>
  )
}

export const SearchNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Dashboard} />
    </Stack.Navigator>
  )
}
