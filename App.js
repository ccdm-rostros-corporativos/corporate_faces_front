import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-native-paper'
import { theme } from './src/core/theme'
import StackNavigation from './src/CustomNavigation'

export default props => (
  <Provider theme={theme}>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  </Provider >
)
