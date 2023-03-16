import {
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Buttons from "../components/Buttons";

const Onboarding = ({ navigation }) => {
  return (
    <View
      style={styles.container}
      // style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={styles.imageContainer}
        // style={{ flex: 3, flexDirection: "column", backgroundColor: "#ddd" }}
      >
        <ImageBackground
          source={require("../assets/images/image.png")}
          style={styles.image}
          // style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        />
      </View>
      {/* button and text */}
      <View
        style={styles.textContainer}
        // style={{ flex: 1, backgroundColor: "#fff" }}
      >
        {/* text part */}
        <View
          style={styles.text}
          // style={{
          //   flex: 1,
          //   flexDirection: "column",
          //   justifyContent: "flex-start",
          //   alignItems: "center",
          //   backgroundColor: "#fff",
          // }}
        >
          {/* <Text style={{ Color: Colors.black, fontSize: 30 }}>NUntim</Text> */}
          <Text
            style={styles.title}
            // style={{
            //   Color: Colors.black,
            //   fontSize: 30,
            //   textAlign: "center",
            //   paddingTop: 4,
            // }}
          >
            Manage your health and happy future
          </Text>
        </View>

        <View
          // style={{
          //   flex: 1,
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "flex-end",
          // }}
          style={styles.button}
        >
          <View style={{ width: "50%" }}>
            <Buttons
              btn_text={"Get Started"}
              on_press={() => navigation.replace("Signup")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#ddd",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  textContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    paddingTop: 4,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default Onboarding;
