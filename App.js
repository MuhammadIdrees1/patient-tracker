import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./src/Navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/context/AuthContext";

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
