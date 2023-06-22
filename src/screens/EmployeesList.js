import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { theme } from '../core/theme';

export default function EmployeesList() {
  const [selectedArea, setSelectedArea] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  const dummyEmployeeData = [
    { id: 1, firstName: 'Empleado 1', lastName: 'Apellido 1', occupation: 'Cargo 1', area: 'Área 1', phoneNumber: '1234567890', email: 'empleado1@example.com' },
    { id: 2, firstName: 'Empleado 2', lastName: 'Apellido 2', occupation: 'Cargo 2', area: 'Área 2', phoneNumber: '2345678901', email: 'empleado2@example.com' },
    { id: 3, firstName: 'Empleado 3', lastName: 'Apellido 3', occupation: 'Cargo 3', area: 'Área 3', phoneNumber: '3456789012', email: 'empleado3@example.com' },
    // ... más empleados
  ];

  useEffect(() => {
    setEmployeeData(dummyEmployeeData);
  }, []);

  const filterEmployees = () => {
    const filteredData = dummyEmployeeData.filter((employee) => {
      if (selectedArea && employee.area.toLowerCase() !== selectedArea.toLowerCase()) {
        return false;
      }
      if (employeeName && !employee.firstName.toLowerCase().includes(employeeName.toLowerCase())) {
        return false;
      }
      if (occupation && employee.occupation.toLowerCase() !== occupation.toLowerCase()) {
        return false;
      }
      return true;
    });

    setEmployeeData(filteredData);
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.employeeInfo}>Cargo: {item.occupation}</Text>
      <Text style={styles.employeeInfo}>Área: {item.area}</Text>
      <Text style={styles.employeeInfo}>Teléfono: {item.phoneNumber}</Text>
      <Text style={styles.employeeInfo}>Correo: {item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Búsqueda de Empleados</Text>
      <TextInput
        label="Área o Departamento"
        value={selectedArea}
        onChangeText={(value) => setSelectedArea(value)}
      />
      <TextInput
        label="Nombre de Empleado"
        value={employeeName}
        onChangeText={(value) => setEmployeeName(value)}
      />
      <TextInput
        label="Cargo u Ocupación"
        value={occupation}
        onChangeText={(value) => setOccupation(value)}
      />
      <Button mode="contained" onPress={filterEmployees} style={styles.searchButton}>
        Buscar
      </Button>
      <FlatList
        data={employeeData}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  employeeItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employeeInfo: {
    fontSize: 14,
    color: '#666666',
  },
});
