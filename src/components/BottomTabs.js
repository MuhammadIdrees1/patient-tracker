import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddPatientDetails from "../screens/AddPatientDetails";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          position: "absolute",
          bottom: 5,
          marginHorizontal: 10,
          height: 60,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { height: 10, width: 10 },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home-filled"
              size={28}
              color={focused ? "#006FFE" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPatientDetails"
        component={AddPatientDetails}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddPatientDetails");
              }}
            >
              <SafeAreaView
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: "#FFf",
                  borderWidth: 2,
                  borderColor: "#006FFE",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <MaterialIcons name="add" size={40} color={"#006FFE"} />
              </SafeAreaView>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={28}
              color={focused ? "#006FFE" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;

const styles = StyleSheet.create({});
