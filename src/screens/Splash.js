import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";

const Splash = ({ navigation }) => {
  // Redirects to Onboarding screen after 2 seconds of mounting
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#465bd8"
      />
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.image}
      />

      <Text style={styles.text}>Patient Care</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "auto",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 30,
    color: "white",
  },
});

export default Splash;
