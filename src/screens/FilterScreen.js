import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import UsersList from './UsersList';
import { baseUrl } from '../config';

export default function FilterScreen({ navigation, route }) {
  const headquarter = route.params;

  const [workArea, setWorkArea] = useState(null);
  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [dropdownData, setDropdownData] = useState([])

  useEffect(() => {
    (async () => {
      if (!headquarter) {
        const response = await fetch(`${baseUrl.LH}/headquarter/workAreas`, {
          method: 'GET',
        });
        const json = await response.json();
        setDropdownData(json.data.map((wa) => ({ label: wa._id, value: wa._id })));
      } else {
        setDropdownData(headquarter.workAreas.map((wa) => ({ label: wa.name, value: wa.name })));
      }
    })();
  }, []);

  const getUsers = async () => {
    try {
      let query = headquarter ? `headquarter=${headquarter._id}&`: '';
      query += workArea ? `workArea=${workArea}&` : '';
      query += name ? `name=${name}&` : '';
      query += position ? `position=${position}` : '';
      const response = await fetch(`${baseUrl.LH}/employee?${query}`, {
        method: 'GET',
      });
      const json = await response.json();
      setUsers(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (dropdownData.length > 0 ) {
    return (
      <ScrollView>
        <Background style={{ padding: 10 }}>
          <Header style={{fontSize: 28, color: theme.colors.secondary, fontWeight: 'bold', paddingVertical: 12, textAlign: 'center'}}>Búsqueda de personal</Header>
          <Text style={{fontSize: 18, marginBottom: 7, marginTop: 15}}>Área o departamento</Text>
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
            placeholder={!isFocus ? 'Selecciona una opción' : '...'}
            searchPlaceholder="Search..."
            value={workArea}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setWorkArea(item.value);
              setIsFocus(false);
            }}
          />
          <TextInput
            label="Nombre"
            returnKeyType="next"
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
            autoCompleteType="name"
          />
          <TextInput
            label="Cargo u ocupación"
            returnKeyType="next"
            value={position}
            onChangeText={(text) => setPosition(text)}
            autoCapitalize="none"
            autoCompleteType="name"
          />
          <Button mode="contained" onPress={getUsers}>
            Buscar
          </Button>

          {users.map((user) =>(
            <UsersList key={user._id} user={user}/>
          ))}
        </Background>
      </ScrollView>
    )} else {
      return (
        <Background style={{ padding: 10 }}>
          <Text style={styles.title}>Waiting...</Text>
        </Background>
      )
    };
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 7
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
  photo: {
    width: 150,
    height: 150,
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
