import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const InicioScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/log.png")} style={styles.logo} />

        <View style={styles.socialIconsContainer}>
          <FontAwesome name="instagram" style={styles.socialIcon} />
          <FontAwesome name="facebook" style={styles.socialIcon} />
          <FontAwesome name="twitter" style={styles.socialIcon} />
        </View>
      </View>

      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: "https://i.postimg.cc/zDjGSGcK/banner.png" }}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorías Destacadas</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: "https://i.postimg.cc/zXTmqbSg/r1.png" }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Ropa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: "https://i.postimg.cc/GpcXw9qd/e1.png" }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Electrónica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: "https://i.postimg.cc/L8FyDxPq/h1.png" }}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>Hogar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.sliderTitulo}>Promociones</Text>
        <FlatList
          data={[
            "https://i.postimg.cc/FFqCdrsV/b3.png",
            "https://i.postimg.cc/2jbRXX1T/of1.png",
            "https://i.postimg.cc/w38kWB1K/of3.png",
          ]}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.sliderImage} />
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ofertas Especiales</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offersContainer}
      >
        <TouchableOpacity style={styles.offerCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/zv9x9jPc/b1.png" }}
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Descuentasos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/tg22XyMP/b2.png" }}
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Ofertas del Día</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/y6M4qX9K/of5.png" }}
            style={styles.offerImage}
          />
          <Text style={styles.offerTitle}>Oferta Especial</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuevos Lanzamientos</Text>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.largeCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/9F78y6D5/l1.png" }}
            style={styles.largeCardImage}
          />
          <Text style={styles.cardTitle}>Xbox ONE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/pLQs6KQs/l2.png" }}
            style={styles.largeCardImage}
          />
          <Text style={styles.cardTitle}>Bisuteria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeCard}>
          <Image
            source={{ uri: "https://i.postimg.cc/PxJKJcg7/l3.png" }}
            style={styles.largeCardImage}
          />
          <Text style={styles.cardTitle}>Libros</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(31, 193, 190, 0.57)",
  },
  logo: {
    width: 100,
    height: 55,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    marginTop: 10,
  },
  socialIcon: {
    fontSize: 24,
    color: "#000000",
    marginHorizontal: 10,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginLeft: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  largeCard: {
    width: "25%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
  },
  largeCardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  sliderTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "#333",
  },
  sliderImage: {
    width: 250,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  offersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  offerCard: {
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  offerImage: {
    width: 130,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  offerTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginTop: 5,
  },
});

export default InicioScreen;
