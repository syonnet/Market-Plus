import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomTextInput = ({
  iconName,
  placeholder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
  error,
}) => (
  <View style={styles.inputContainer}>
    <FontAwesome name={iconName} style={styles.inputIcon} />
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
    {error && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )}
  </View>
);

export default function RegistroScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    try {
      // Obtener usuarios registrados actuales o inicializar un array vacío
      const usersDataString = await AsyncStorage.getItem('usersData');
      const usersData = JSON.parse(usersDataString) || [];
      const existingUser = usersData.find(userData => userData.username === username);
      if (existingUser) {
        setErrors({ ...errors, username: 'Usuario ya registrado' });
        return;
      }

      // Limitar a 10 registros
      if (usersData.length >= 10) {
        Alert.alert('Límite de registros', 'Se ha alcanzado el límite máximo de usuarios registrados.');
        return;
      }
    const newErrors = {
      username: !username ? "Campo requerido" : "",
      email: !email ? "Campo requerido" : validateEmail(email) ? "" : "Correo electrónico inválido",
      age: !age ? "Campo requerido" : isNaN(age) ? "Ingresa solo números" : "",
      password: !password ? "Campo requerido" : "",
      confirmPassword: !confirmPassword ? "Campo requerido" : "",
    };

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    if (
      !newErrors.username &&
      !newErrors.email &&
      !newErrors.age &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      // Lógica de registro aquí
      usersData.push({ username, password }); // Agregar usuario al array
      await AsyncStorage.setItem('usersData', JSON.stringify(usersData)); // Guardar en AsyncStorage

      Alert.alert(
        "Registro exitoso",
        "¡Bienvenido! Tu cuenta ha sido creada exitosamente.",
        [{ text: "OK", onPress: handleRegistrationSuccess }]
      );
      navigation.navigate('Login'); 
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  const handleRegistrationSuccess = () => {
    setUsername("");
    setEmail("");
    setAge("");
    setPassword("");
    setConfirmPassword("");
    navigation.navigate("Login"); 
  };

  const handleLoginLinkPress = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/sx1DKxKn/fondo.png" }}
        style={styles.backgroundImage}
        blurRadius={10}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.postimg.cc/bwDVgTQK/registro.png" }}
            style={styles.logo}
          />
        </View>
        <View style={styles.main}>
          <CustomTextInput
            iconName="user-circle"
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            error={errors.username}
          />
          <CustomTextInput
            iconName="envelope"
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            error={errors.email}
          />
          <CustomTextInput
            iconName="birthday-cake"
            placeholder="Edad"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
            error={errors.age}
          />
          <CustomTextInput
            iconName="lock"
            placeholder="Contraseña"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
            error={errors.password}
          />
          <CustomTextInput
            iconName="lock"
            placeholder="Confirmar contraseña"
            secureTextEntry={!isPasswordVisible}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            error={errors.confirmPassword}
          />
          <TouchableOpacity
            style={styles.togglePasswordVisibility}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            
            <Text style={styles.togglePasswordText}>
              {isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginText} onPress={handleLoginLinkPress}>
          <Text style={styles.loginLink}>¿Ya tienes una cuenta? Inicia sesión aquí.</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 200,
  },
  main: {
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 110,
    paddingLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
    color: "#333",
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: "#5046b9",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
  },
  btn: {
    width: "80%",
    alignSelf: "center",
    padding: 12,
    backgroundColor: "#ffc847f2",
    borderRadius: 25,
    marginBottom: 10,
  },
  btnText: {
    color: "#140101",
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    marginTop: 10,
    fontSize: 14,
  },
  loginLink: {
    color: "#7C9D96",
    fontWeight: "bold",
    textAlign: "center",
  },
  togglePasswordText: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "red",
  },
});
