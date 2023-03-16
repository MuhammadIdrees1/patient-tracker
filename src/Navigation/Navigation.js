import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Onboarding from "../screens/Onboarding";
import BottomTabs from "../components/BottomTabs";
import Splash from "../screens/Splash";
import firebase from "firebase/compat";
import PatientDetail from "../screens/patientDetail";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";

const Stack = createStackNavigator();

const navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState("");

  const onAuthStateChanged = (user) => {
    setUser(user);

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    // Subscribe to authentication state changes

    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // Unsubscribe when the component unmounts
    return subscriber;
  }, []);

  if (initializing) {
    // Show a loading screen while initializing

    return null;
  }

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in, persist the user's authentication state
  //       AsyncStorage.setItem("user", JSON.stringify(user));
  //       setUser(user);
  //     } else {
  //       // User is signed out, clear the user's authentication state
  //       AsyncStorage.removeItem("user");
  //       setUser(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  if (!user) {
    // Show onboarding and authentication screens if user is not authenticated
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  // Show main app screens if user is authenticated
  console.log("navigationUserId", user.uid);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Patient Detail Single" component={PatientDetail} />
    </Stack.Navigator>
  );
};
export default navigation;
