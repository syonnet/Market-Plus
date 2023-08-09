import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import comidaData from '../assets/data/comida.json';

const MAX_PRODUCTOS = 5; // Cantidad máxima

const ProductosScreen = ({ agregarAlCarrito }) => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    setProductosDisponibles(comidaData.menu);
  }, []);

  const handleAgregarCarrito = (producto) => {
    if (cantidadCarrito >= MAX_PRODUCTOS) {
      Alert.alert(
        'Cantidad máxima alcanzada',
        `Solo puedes agregar un máximo de ${MAX_PRODUCTOS} productos al carrito.`,
        [{ text: 'OK', onPress: () => []}]
      );
      return;
    }

    agregarAlCarrito(producto);
    setCantidadCarrito((prevCantidad) => prevCantidad + 1);
  };

  const handleVaciarCarrito = () => {
    setProductosDisponibles([...productosDisponibles, ...productosCarrito]);
    setProductosCarrito([]);
    setCantidadCarrito(0);
  };

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.imagenContainer}>
          <Image source={{ uri: item.imagen }} style={styles.imagenProducto} />
        </View>
        <View style={styles.detalleContainer}>
          <Text style={styles.nombreProducto}>{item.nombre}</Text>
          <Text style={styles.descripcionProducto}>{item.descripcion}</Text>
          <Text style={styles.precioProducto}>Precio: ${item.precio}</Text>
          <TouchableOpacity
            onPress={() => handleAgregarCarrito(item)}
            style={styles.botonAgregar}
          >
            <Icon name="add-shopping-cart" size={25} color="#ffc847f2" />
            <Text style={styles.textoBotonAgregar}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cantidadCarrito > 0 ? (
        <TouchableOpacity style={styles.cantidadCarrito} onPress={handleVaciarCarrito}>
          <Icon name="flag" size={20} color="white" style={styles.iconoCarrito} />
          <Text style={styles.textoCarrito}>{cantidadCarrito} productos en el carrito - Tap para vaciar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.cantidadCarrito}>
          <Text>0 productos en el carrito</Text>
        </View>
      )}
      <FlatList
        data={productosDisponibles}
        renderItem={renderProducto}
        keyExtractor={(item) => item.nombre}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A1CCD1',
  },
  
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F4F2DE',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagenContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagenProducto: {
    flex: 1,
    borderRadius: 10,
  },
  detalleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcionProducto: {
    fontSize: 14,
    color: 'gray',
  },
  precioProducto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  botonAgregar: {
    marginTop: 10,
  },
  botonAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C9D96',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotonAgregar: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize:16,
  },
  cantidadCarrito: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc847f2',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconoCarrito: {
    marginRight: 5,
    color:"red"
  },
  textoCarrito: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductosScreen;
