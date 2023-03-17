import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Onboarding from "../screens/Onboarding";
import BottomTabs from "../components/BottomTabs";
import Splash from "../screens/Splash";
import PatientDetail from "../screens/patientDetail";
import { useLogin } from "../context/AuthContext";
const Stack = createStackNavigator();

const navigation = () => {
  const { isLoggedIn } = useLogin();
  const { user } = useLogin();
  if (!isLoggedIn) {
    // Show onboarding and authentication screens if user is not authenticated
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  // Show main app screens if user is authenticated
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Patient Detail Single" component={PatientDetail} />
    </Stack.Navigator>
  );
};
export default navigation;
