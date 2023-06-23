import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import Background from '../components/Background'
import { theme } from '../core/theme'

export default function HeadquarterScreen({ navigation }) {

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     const loc = await Location.getCurrentPositionAsync({});
  //     setLocation(loc);
  //   })();
  // }, []);

  const [headquarters, setHeadquarters] = useState([]);


  useEffect(() => {
    getHeadquarters();
  }, []);

  const getHeadquarters = async () => {
    try {
      const response = await fetch('http://192.168.112.1:3000/api/headquarter');
      const json = await response.json();
      setHeadquarters(json);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(headquarters)

  return (
    <Background style={{ padding: 10 }} >
      {/* <Text style={{ paddingTop: 20, fontWeight: 'bold', fontSize: 18, color: 'black' }}> Mapa geolocalizado </Text> */}
      <MapView style={styles.map}>
        {headquarters.map((headquarter, key) => {
          return (
            <Marker
            key={headquarter.address}
            coordinate={{ latitude: headquarter.latitude, longitude: headquarter.longitude }}
            title={headquarter.name}
            description={headquarter.address}
          />
        )
        })}
      </MapView>
    </Background>
  )
}
