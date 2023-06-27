import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import Background from '../components/Background'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import Button from '../components/Button'
import { baseUrl } from '../config'

export default function FilterScreen({ navigation, route }) {

  const headquarter = route.params;

  const [workArea, setWorkArea] = useState(null);
  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [elementVisible, setElementVisible] = useState(false);

  const dropdownData = headquarter.workAreas.map((wa) => ({ label: wa.name, value: wa.name }));

  const getUsers = async () => {
    try {
      let query = `headquarter=${headquarter._id}`;
      query += workArea ? `&workArea=${workArea}` : '';
      query += name ? `&name=${name}` : '';
      query += position ? `&position=${position}` : '';
      const response = await fetch(`${baseUrl.LH}/employee?${query}`, {
        method: 'GET'
      });
      const json = await response.json();
      setUsers(json.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Background style={{ padding: 10 }} >
      {/* <Text >Filters {id}, {name}</Text> */}
      <Header>Busqueda de personal</Header>
      <Text >Area o departamento</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={workArea}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setWorkArea(item.value);
          setIsFocus(false);
        }}
      />
      <Text >Nombre empleado</Text>
      <TextInput
        label="name"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize="none"
        autoCompleteType="name"
      />
      <Text >Cargo u ocupacion</Text>
      <TextInput
        label="position"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setPosition(text)}
        autoCapitalize="none"
        autoCompleteType="name"
      />
      <Button mode="contained" onPress={getUsers}>Buscar</Button>

      {users.map((user) => {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <Button mode="search" onPress={() => setElementVisible(!elementVisible)}>{user.name}</Button>
            <View
              style={{
                padding: 20,
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {elementVisible ? (
                <View
                  style={{
                    backgroundColor: 'blue',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Hello world!</Text>
                </View>
              ) : null}
            </View>
          </SafeAreaView>

        )
      })}

    </Background>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
