import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

const MiCuentaScreen = () => {
  const route = useRoute();
  const { username } = route.params;
  const navigation = useNavigation();
  const handleLogout = () => {
    Alert.alert(
      "Espera Mortal !!!",
      "¿Estás seguro de que deseas salir ?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => {
            // Redirigir al screen de login
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/8PnrQg6F/cuen1.png" }}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.userInfoContainer}>
            <Icon
              name="person-circle-outline"
              size={80}
              color="#b3d1cb"
              style={styles.icon}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.usuarioTexto}>{username}</Text>
              <Text style={styles.telefonoTexto}>Gestiona tu perfil</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.seccionTitulo}>Tus Ordenes</Text>
        <View style={styles.seccionContainer}>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#1D5D9B" }]}
            onPress={() =>
              alert("Aqui vas a encontrar todas tus ordenes favoritas")
            }
          >
            <Icon name="heart-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Mis Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#75C2F6" }]}
            onPress={() => alert("Siguiendo algunos pedidos")}
          >
            <Icon name="person-add-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Siguiendo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#fac000" }]}
            onPress={() => alert("Historial de todos tus pedidos")}
          >
            <Icon name="time-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Guardados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#6d5ef3" }]}
            onPress={() => alert("Cupones gratis")}
          >
            <Icon name="pricetag-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Cupones</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.sliderTitulo}>Promociones</Text>
          <FlatList
            data={[
              'https://i.postimg.cc/zDjGSGcK/banner.png',
              'https://i.postimg.cc/tg22XyMP/b2.png',
              'https://i.postimg.cc/Bb1gcFQc/of2.png',
              'https://i.postimg.cc/zv9x9jPc/b1.png',
              'https://i.postimg.cc/2jbRXX1T/of1.png',
            ]}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.sliderImage}
              />
            )}
          />
        </View>
        <Text style={styles.seccionTitulo}>Configuración</Text>
        <View style={styles.seccionContainer}>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#1D5B79" }]}
            onPress={() => alert("Gestiona tus tarjetas")}
          >
            <Icon name="card" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Mis Tarjetas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#468B97" }]}
            onPress={() => alert("Cambia o actualiza tu dirección")}
          >
            <Icon name="navigate-circle-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Direccion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#EF6262" }]}
            onPress={() => alert("Tienes algún problema comunicate")}
          >
            <Icon name="call" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Soporte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opcionContainer, { backgroundColor: "#F3AA60" }]}
            onPress={() => alert("Aquí puedes borrar tu cuenta")}
          >
            <Icon name="alert-circle-outline" size={24} color="#fff" />
            <Text style={styles.opcionTexto}>Borrar cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon
              name="log-out-outline"
              size={24}
              color="#fff"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  userInfoText: {
    flex: 1,
  },
  telefonoTexto: {
    fontSize: 14,
    color: "#fff",
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000", 
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cc0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignContent: "center",
  },
  logoutIcon: {
    marginRight: 5,
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
  },
  sliderTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },
  sliderImage: {
    width: 200,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  container: {
    padding: 20,
  },
  centeredContainer: {
    alignItems: "center",
  },
  usuarioTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#0e0101",
  },
  seccionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  opcionContainer: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  opcionTexto: {
    marginLeft: 5,
    color: "#fff",
  },
  finalTexto: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});

export default MiCuentaScreen;
