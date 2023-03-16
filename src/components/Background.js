import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={{
        flex: 1,
        height: "70%",
        width: "100%",
      }}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({});
