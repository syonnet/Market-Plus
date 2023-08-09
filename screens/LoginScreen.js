import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation();
  const backgroundImageUri = "https://i.postimg.cc/sx1DKxKn/fondo.png";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      // Obtener usuarios registrados
      const usersDataString = await AsyncStorage.getItem("usersData");
      const usersData = JSON.parse(usersDataString) || [];
      console.log('Usuarios registrados al iniciar sesión:', usersData);//verificacion de datos

      // Buscar el usuario en la lista
      const user = usersData.find(
        (userData) =>
          userData.username === username && userData.password === password
      );
      // estados a cero
      if (user) {
        setUsername("");
        setPassword("");

        Alert.alert("Bienvenido Humano", "Te has logeado con éxito");
        navigation.navigate("Inicio"); 
        navigation.navigate("Cuenta", { username: user.username });//perfil usuario
      } else {
        Alert.alert(
          "Opps! tenemos prolemas",
          "Usuario o contraseña incorrectos"
        );
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("Registro"); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImageUri }}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={10}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://i.postimg.cc/sgk6Nhm1/login.png" }}
            style={styles.image}
          />
          <Text style={styles.title}>Bienvenido a Market Plus</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color="#0a2fff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#0a2fff"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.togglePasswordVisibility}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#0a2fff"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
            >
              <Ionicons name="logo-facebook" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#ff9f1a" }]}
            >
              <Ionicons name="logo-instagram" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#db4437" }]}
            >
              <Ionicons name="logo-google" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signupButtonText}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: "rgba(196, 196, 196, 0.79)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "black",
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffc847f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#0e0101",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  socialButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  forgotPasswordButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
  },
  signupButton: {
    marginLeft: 5,
  },
  signupButtonText: {
    color: "#ff1414f2",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 280,
    height: 220,
  },
});
