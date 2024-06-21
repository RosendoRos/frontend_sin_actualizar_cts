import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

// Definir una interfaz para los detalles del usuario
interface UserDetails {
  timestamp: string;
  entrada_sali: string;
  // Agrega otras propiedades según lo que esperes recibir de la API
}

// Definir el tipo para los parámetros de la ruta
type UserDetailsScreenRouteProp = RouteProp<{ UserDetails: { id_unico: string } }, 'UserDetails'>;

// Definir el componente UserDetailsScreen
const UserDetailsScreen = ({ route }: { route: UserDetailsScreenRouteProp }) => {
  const { id_unico } = route.params;
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.99:5000/api/users/${id_unico}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to fetch user details');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Empleado</Text>
      <FlatList
        data={userDetails}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.timestamp}</Text>
            <Text>{item.entrada_sali}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserDetailsScreen;



