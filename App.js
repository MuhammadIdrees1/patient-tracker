import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./src/screens/Signup";

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    // {/* <Signup />/rrr */}
  );
};

export default App;

const styles = StyleSheet.create({});
