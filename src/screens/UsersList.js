import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';

import Button from '../components/Button';

export default function UsersList({ user }) {
  const [elementVisible, setElementVisible] = useState(false);
  return (
    <SafeAreaView key={user._id} style={styles.container}>
      <Button
        title={user.name}
        mode="filter"
        style={{ width: 300, height: 50, backgroundColor: '#cdcdcd' }}
        onPress={() => setElementVisible(!elementVisible)}
      >
        {user.name}
      </Button>
      {elementVisible ? (
        <View
          style={{
            flex: 1,
            display: 'block',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <View>
            <Image style={styles.photo} source={{ uri: user.photo }} />
            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', marginTop: 10 }}>{user.headquarter.name}</Text>
            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}>{user.workArea}</Text>
            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}>{user.position}</Text>
            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center' }}>{user.telephone}</Text>
            <Text style={{ color: 'black', fontSize: 15, textAlign: 'center', textDecorationLine: 'underline', marginBottom: 10 }}>{user.email}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  photo: {
    marginTop: 5,
    display: 'flex',
    width: 170,
    height: 170,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
