import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import Background from "../components/Background";
import { Entypo } from "@expo/vector-icons";

const PatientDetail = ({ navigation, route }) => {
  // get the params from the route prop and store it in the `item` constant
  const item = route.params;

  return (
    <Background>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 10,
          position: "absolute",
          zIndex: 1,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Entypo name="back" size={30} color="white" />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.heading}>Patient Detail</Text>
          <SafeAreaView style={styles.detailContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Name:</Text> {item.name}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Disease:</Text> {item.disease}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Gender: </Text> {item.gender}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Cost:</Text> {item.cost}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Date:</Text> {item.date}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Age: </Text> {item.age}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Medication:</Text> {item.medication}
            </Text>
          </SafeAreaView>
        </SafeAreaView>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/images/profileIcon-removebg-preview.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderWidth: 4,
              borderColor: "#006FFE",
              borderRadius: 100,
            }}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default PatientDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: "60%",
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
    // marginTop: 70,
  },
  imageWrapper: {
    backgroundColor: "#ffffff",
    height: 150,
    width: 150,
    borderRadius: 100,
    position: "absolute",
    top: 75,
    borderColor: "#ffffff",
    borderWidth: 10,
  },
  heading: {
    textAlign: "center",
    marginTop: 80,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  detailContainer: {
    // backgroundColor: "cyan",
    height: "70%",
    marginHorizontal: 10,
    borderColor: "#F3F2F2",
    borderTopWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    color: "#006FFE",
    fontSize: 15,
    fontWeight: "700",
  },
  infoText: { marginVertical: 5 },
});
