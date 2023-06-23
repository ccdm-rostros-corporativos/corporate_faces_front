import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import HeadquarterScreen from './screens/HeadquarterScreen';
import { BottomTab } from './BottomTab'

const Stack = createStackNavigator()

export default props => (
  <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
  >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTab} />
  </Stack.Navigator>
)

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
