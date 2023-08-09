import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 

import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import InicioScreen from '../screens/InicioScreen';
import ProductosScreen from '../screens/ProductosScreen';
import CarritoScreen from '../screens/CarritoScreen';
import CuentaScreen from '../screens/CuentaScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, { ...producto, cantidad: 1 }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Inicio">
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  // Asigna el ícono según la ruta
                  if (route.name === 'Inicio') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Productos') {
                    iconName = focused ? 'basket' : 'basket-outline';
                  } else if (route.name === 'Carrito') {
                    iconName = focused ? 'cart' : 'cart-outline';
                  } else if (route.name === 'Cuenta') {
                    iconName = focused ? 'person' : 'person-outline';
                  }

                  // Devuelve el componente Icon con el ícono correspondiente
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#e02200',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Inicio" options={{headerShown: false}} component={InicioScreen} />
              <Tab.Screen name="Productos" options={{headerShown: false}}>
                {(props) => <ProductosScreen {...props} agregarAlCarrito={agregarAlCarrito} />}
              </Tab.Screen>
              <Tab.Screen name="Carrito" options={{headerShown: false}}>
                {(props) => <CarritoScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
              </Tab.Screen>
              <Tab.Screen name="Cuenta" options={{headerShown: false}}component={CuentaScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
