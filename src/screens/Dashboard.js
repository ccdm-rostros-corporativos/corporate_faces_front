import React from 'react'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Background from '../components/Background'
import Button from '../components/Button'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../core/theme'

export default function Dashboard({ navigation }) {
    return (
        <Background style={{ padding:10 }} >
          <Logo style={styles.logo} />
          <Header style={styles.header} >Rostros Corporativos</Header>
          <Button mode="text" style={styles.button} onPress={ () => {navigation.navigate("HeadquartersScreen")} }>Búsqueda geolocalizada</Button>
          <Button mode="text" style={styles.button} onPress={ () => {navigation.navigate("FilterScreen")} }>Búsqueda por filtros</Button>
          <Button mode="text" style={styles.button}>Búsqueda por referencia</Button>
        </Background>
    )
  }

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8
  },
  header: {
    fontSize: 25,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginVertical:15
  },
  button: {
    height: 50,
    color: theme.colors.secondary,
    backgroundColor: '#cdcdcd'
  }
})
