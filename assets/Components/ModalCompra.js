// ModalCompra.js
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const ModalCompra = ({ visible, totalCarrito, iva, totalAPagar, onCancel, onConfirm }) => {
  const [timeLeft, setTimeLeft] = useState(10); //tiempo de cierre

  useEffect(() => {
    let timer;
    if (visible) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setTimeLeft(10); // Reseteo del modal
    }

    return () => clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    if (timeLeft === 0) {
      onCancel(); // cerrar modal automaticamente
    }
  }, [timeLeft, onCancel]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Resumen de la Compra:</Text>
          <Text style={styles.modalText}>Total de la compra: ${totalCarrito.toFixed(2)}</Text>
          <Text style={styles.modalText}>IVA (12%): ${iva.toFixed(2)}</Text>
          <Text style={styles.modalText}>Total a pagar: ${totalAPagar.toFixed(2)}</Text>
          <Text style={styles.modalText}>Tiempo restante: {timeLeft} segundos</Text>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#2098f3' }}
            onPress={onConfirm}
          >
            <Text style={styles.textStyle}>Confirmar Compra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#FF0000' }}
            onPress={onCancel}
          >
            <Text style={styles.textStyle}>Cancelar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#eff1f0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#c70000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalCompra;
