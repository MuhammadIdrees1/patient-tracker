import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import Background from "../components/Background";
import firebase from "firebase/compat";
const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);
  console.log(name);

  const handleSignup = () => {
    // Check if the user has entered all the required information
    if (!name || !email || !password) {
      alert("Please enter name email and password");
      return;
    }
    // Create the user with the entered email and password

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Save user data to Firebase Realtime Database

        set(ref(db, `user/${userCredential.user.uid}`), {
          name: name,
          email: email,
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ...
      });
  };

  const facebookSignup = () => {};

  const googleSignup = () => {};

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <SafeAreaView>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.desc}>Fill The Bellow Information To Signup</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.formHeading}>Create Account</Text>
          <SafeAreaView style={styles.inputGroup}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text
              style={{
                height: 30,
                width: 50,
                backgroundColor: "#F3F2F2",
                borderRadius: 50,
                alignSelf: "center",
                textAlignVertical: "center",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              OR
            </Text>
            <SafeAreaView style={styles.iconsGroup}>
              <TouchableOpacity onPress={facebookSignup}>
                <Image source={require("../assets/images/facebook.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={googleSignup}>
                <Image source={require("../assets/images/google.png")} />
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.linkWrapper}>
          <Text style={[styles.desc, { color: "#0E0E0E", marginBottom: 5 }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>LOG IN</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    height: 400,
    width: 300,
    backgroundColor: "#ffffff",

    borderRadius: 30,
    elevation: 1,
  },
  desc: {
    color: "#ffffff",
    fontSize: 17,
    marginBottom: 15,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  logo: {
    height: 70,
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  formHeading: {
    marginVertical: 15,
    fontSize: 25,
    fontWeight: "500",
  },

  input: {
    width: 250,

    paddingVertical: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: 230,
    borderRadius: 50,
    backgroundColor: "#0268FF",
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  iconsGroup: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  linkWrapper: { marginTop: 30 },
  link: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#0268FF",
  },
});

export default Signup;
