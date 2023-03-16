import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { useState } from "react";
import Background from "../components/Background";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig";
import { ref, update } from "firebase/database";

import firebase from "firebase/compat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "../components/Buttons";

const PatientDetail = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [qualification, setQualification] = useState("");
  const [age, setAge] = useState();
  const [experience, setExperience] = useState("");
  // const userId = auth.currentUser.uid;

  // const updateUser = () => {
  //   const userRef = ref(db, `user/${userId}`);
  //   update(userRef, {
  //     age: age,
  //     experience: experience,
  //     qualification: qualification,
  //   })
  //     .then(() => {
  //       console.log("User updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating user: ", error);
  //     });
  // };

  // Define function to handle logout
  const handleLogout = () => {
    // Call Firebase auth signOut method

    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"))
      .catch((error) => console.error(error));
  };

  // Get the item parameter from the route

  const item = route.params;
  console.log(item);
  return (
    <Background>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 10,
          position: "absolute",
          zIndex: 1,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Entypo name="back" size={30} color="white" />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.heading}>Profile Info</Text>
          <SafeAreaView style={styles.detailContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Name:</Text>
              {/* {auth.currentUser.displayName} */}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Email:</Text>
              {/* {auth.currentUser.email} */}
            </Text>
            <View style={styles.buttonWrapper}>
              <Buttons btn_text={"Logout"} on_press={handleLogout} />
            </View>
            {/* <Button title="Open Modal" onPress={() => setModalVisible(true)} /> */}
          </SafeAreaView>
        </SafeAreaView>
        <View style={styles.imageWrapper}>
          <Image
            source={require("../assets/images/profileIcon-removebg-preview.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderWidth: 4,
              borderColor: "#006FFE",
              borderRadius: 100,
            }}
          />
        </View>

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              height: 500,
              marginHorizontal: 20,
              marginTop: 100,
              justifyContent: "center",
              elevation: 3,
              borderRadius: 30,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 25, fontWeight: "600" }}
            >
              Update Profile
            </Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor={"#0268FF"}
              style={[styles.input]}
              value={auth.currentUser.displayName}
              editable={false}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"#0268FF"}
              style={[styles.input]}
              value={auth.currentUser.email}
              editable={false}
            />
            <View style={[styles.inputGroup]}>
              <TextInput
                placeholder="Age"
                placeholderTextColor={"#0268FF"}
                style={[styles.input, { width: 130, marginRight: 15 }]}
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Experience"
                placeholderTextColor={"#0268FF"}
                style={[styles.input, { width: 130 }]}
                value={experience}
                onChangeText={(text) => setExperience(text)}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              placeholder="Qualification"
              placeholderTextColor={"#0268FF"}
              style={[styles.input]}
              value={qualification}
              onChangeText={(text) => setQualification(text)}
              // keyboardType="numeric"
            />
            <Button
              title="Update"
              onPress={() => {
                updateUser;
                setModalVisible(updateUser);
              }}
            />
            <Button
              title="Close Modal"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </Modal> */}
      </SafeAreaView>
    </Background>
  );
};

export default PatientDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: "60%",
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
    // marginTop: 70,
  },
  imageWrapper: {
    backgroundColor: "#ffffff",
    height: 150,
    width: 150,
    borderRadius: 100,
    position: "absolute",
    top: 75,
    borderColor: "#ffffff",
    borderWidth: 10,
  },
  heading: {
    textAlign: "center",
    marginTop: 80,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  detailContainer: {
    // backgroundColor: "cyan",
    height: "70%",
    marginHorizontal: 10,
    borderColor: "#F3F2F2",
    borderTopWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    color: "#006FFE",
    fontSize: 20,
    fontWeight: "700",
  },
  infoText: { marginVertical: 5, fontSize: 20 },

  buttonWrapper: {
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
    top: 230,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: "100%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inputGroup: { flexDirection: "row" },
});
