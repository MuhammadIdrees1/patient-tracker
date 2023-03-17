import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat";
import "firebase/compat/auth";
import { useNavigation } from "@react-navigation/native";

const LoginContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        // navigation.replace('Login')
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, [initializing, navigation]);

  if (initializing) return null;

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
export default AuthContextProvider;
