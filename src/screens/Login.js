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
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Background from "../components/Background";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle user login

  const handleLogin = () => {
    // Check if email and password are entered
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Authenticate user with entered credentials
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Redirect to home screen on successful login
        navigation.replace("BottomTabs");

        // Signed in
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOG IN</Text>
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
              <TouchableOpacity>
                <Image source={require("../assets/images/facebook.png")} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../assets/images/google.png")} />
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.linkWrapper}>
          <Text style={[styles.desc, { color: "#0E0E0E", marginBottom: 5 }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>SIGN UP</Text>
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
    // marginHorizontal: "9%",
    // marginVertical: "60%",
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
  // inputGroup: {
  //   marginHorizontal: 20,
  // },
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
    marginTop: 70,
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
export default Login;
