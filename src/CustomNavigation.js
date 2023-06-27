import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import HeadquartersScreen from './screens/HeadquartersScreen';
import FilterScreen from './screens/FilterScreen';
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
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Home" component={Dashboard} options={{title: "Menú"}} />
      <Stack.Screen name="HeadquartersScreen" component={HeadquartersScreen} options={{title: "Geolocalización"}} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} options={{title: "Filtros"}} />
    </Stack.Navigator>
  )
}

export const SearchNavigation = () => {
  return (
    <Stack.Navigator
      // initialRouteName="StartScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="FilterScreen" component={FilterScreen} options={{title: "Filtros"}} />
    </Stack.Navigator>
  )
}
