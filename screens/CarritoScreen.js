import React, { useState } from 'react';
import { View, Text, Button, Alert, Image, ScrollView, StyleSheet } from 'react-native';
import ModalCompra from '../assets/Components/ModalCompra';

const CarritoScreen = ({ carrito, setCarrito }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const totalCarrito = carrito.reduce((total, producto) => total + (producto.precio * (producto.cantidad || 1)), 0);
  const iva = totalCarrito * 0.12;
  const totalAPagar = totalCarrito + iva;

  const handleEliminarProducto = (index) => {
    const carritoActualizado = [...carrito];
    carritoActualizado.splice(index, 1);
    setCarrito(carritoActualizado);
  };

  const handleActualizarCantidad = (index, cantidad) => {
    const carritoActualizado = [...carrito];
    carritoActualizado[index].cantidad = cantidad;
    setCarrito(carritoActualizado);
  };

  const handleCompraProducto = (producto) => {
    const carritoActualizado = carrito.filter((p) => p.nombre !== producto.nombre);
    setCarrito(carritoActualizado);

    Alert.alert('Compra realizada', `¡Gracias por comprar ${producto.nombre}!`, [
      { text: 'OK', onPress: () => console.log('Compra de producto confirmada') },
    ]);
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
  };

  const handleCompra = () => {
    setModalVisible(true);
  };

  const handleConfirmCompra = () => {
    setCarrito([]);
    setModalVisible(false);
    Alert.alert('Gracias por tu compra', '¡No te olvides de pasar por las Ofertas!', [
      { text: 'OK', onPress: () => console.log('Compra confirmada') },
    ]);
  };

  const handleCancelCompra = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos en el carrito:</Text>
      <ScrollView style={styles.scrollContainer}>
        {carrito.map((producto, index) => (
          <View key={index} style={styles.productoContainer}>
            <Image source={{ uri: producto.imagen }} style={styles.imagenProducto} />
            <View style={styles.detalleProducto}>
              <Text style={styles.nombreProducto}>{producto.nombre}</Text>
              <Text style={styles.precioProducto}>Precio: ${producto.precio}</Text>
              <View style={styles.botonesCantidad}>
                <Button
                  title="-"
                  onPress={() => handleActualizarCantidad(index, Math.max((producto.cantidad || 1) - 1, 1))}
                />
                <Text style={styles.cantidadProducto}>{producto.cantidad || 1}</Text>
                <Button
                  title="+"
                  onPress={() => handleActualizarCantidad(index, (producto.cantidad || 1) + 1)}
                />
              </View>
              <View style={styles.botonesComprarEliminar}>
                <Button
                  title="Comprar"
                  onPress={() => handleCompraProducto(producto)}
                  style={styles.botonComprar}
                />
                <Button
                  title="Eliminar"
                  onPress={() => handleEliminarProducto(index)}
                  color="red"
                  style={styles.botonEliminar}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {carrito.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total del carrito: ${totalCarrito.toFixed(2)}</Text>
          <View style={styles.botonesComprarVaciar}>
            <Button title="Vaciar Carrito" onPress={() => handleVaciarCarrito()} />
            <Button title="Comprar todo" onPress={() => handleCompra()} />
          </View>
        </View>
      )}
      <ModalCompra
        visible={modalVisible}
        totalCarrito={totalCarrito}
        iva={iva}
        totalAPagar={totalAPagar}
        onConfirm={handleConfirmCompra}
        onCancel={handleCancelCompra}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A1CCD16e',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 10,
  },
  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagenProducto: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  detalleProducto: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  precioProducto: {
    fontSize: 14,
    color: 'gray',
  },
  botonesCantidad: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cantidadProducto: {
    marginHorizontal: 10,
  },
  botonesComprarEliminar: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space',
    marginTop: 10,
  },
  botonComprar: {
    marginRight: 10,
  },
  botonEliminar: {
    width: 'auto',
  },
  totalContainer: {
    marginTop: 20,
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botonesComprarVaciar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CarritoScreen;
