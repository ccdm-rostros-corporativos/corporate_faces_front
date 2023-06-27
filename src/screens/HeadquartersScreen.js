import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Background from '../components/Background'
import { theme } from '../core/theme'
import Button from '../components/Button'
import { baseUrl } from '../config'

export default function HeadquartersScreen({ navigation }) {

  const [headquarters, setHeadquarters] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [closestHeadquarter, setHeadquarter] = useState({});
  const [selectedHeadquarter, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      await getHeadquarters();
      await getClosestHeadquarter(loc);
      setLocation(loc);
    })();
  }, []);

  const getHeadquarters = async () => {
    try {
      const response = await fetch(`${baseUrl.LH}/headquarter`);
      const json = await response.json();
      setHeadquarters(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getClosestHeadquarter = async ({ coords: { latitude, longitude } }) => {
    try {
      const data = {
        latitude: latitude,
        longitude: longitude
      }
      const response = await fetch(`${baseUrl.LH}/headquarter/distance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      setSelected(json.data)
      setHeadquarter(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeSelectHeadquarter = (headquarter) => {
    setSelected(headquarter)
  }

  if (location) {
    return (
      <Background style={{ padding: 10 }} >
        <Text style={styles.title} >La sede más cercana a tu ubicación es {closestHeadquarter.name}</Text>
        <MapView style={styles.map}>
          {headquarters.map((headquarter) => {
            return (
              <Marker
                key={headquarter.address}
                coordinate={{ latitude: headquarter.latitude, longitude: headquarter.longitude }}
                title={headquarter.name}
                description={headquarter.address}
                onPress={() => changeSelectHeadquarter(headquarter)}
              />
            )
          })}
          <Marker
            key={location.latitude}
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            title="Tu ubicación"
            description="Aquí estas tú"
          />
        </MapView>
        <Button mode="contained" onPress={ () => {navigation.navigate("FilterScreen", selectedHeadquarter)} }>
          Ver empleados sede {selectedHeadquarter.name}
        </Button>
      </Background>
    )
  }
  else {
    return (
      <Background style={{ padding: 10 }}>
        <Text style={styles.title}>Waiting...</Text>
      </Background>
    )
  }
}


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '70%',
  },
  title: {
    fontSize: 24,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    paddingBottom: 12,
    marginBottom: 12,
    textAlign: 'center'
  },
});
