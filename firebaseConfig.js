// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqJniXv2-vapxwo2vJhnHE2Bsod0uxcbk",
  authDomain: "patient-tracker-3fb94.firebaseapp.com",
  projectId: "patient-tracker-3fb94",
  storageBucket: "patient-tracker-3fb94.appspot.com",
  messagingSenderId: "454394451367",
  appId: "1:454394451367:web:167342ee329e550a509282",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

  const defaultApp = firebase.initializeApp(firebaseConfig);
  initializeAuth(defaultApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getDatabase();
const auth = getAuth();
export { db, auth };
