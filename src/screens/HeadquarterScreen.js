import React from 'react'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Background from '../components/Background'
import Button from '../components/Button'

import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../core/theme'

export default function HeadquarterScreen({ navigation }) {
  return (
      <Background style={{ padding:10 }} >
        <Text style={ {paddingTop: 20, fontWeight: 'bold', fontSize: 18, color: 'black'} }> Mapa geolocalizado </Text>
      </Background>
  )
}
