import { ref, set, push } from "firebase/database";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import React, { useState } from "react";
import TagInput from "../components/TagInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../../firebaseConfig";
import Buttons from "../components/Buttons";
import { Entypo } from "@expo/vector-icons";

const AddPatientDetails = ({ navigation }) => {
  // State variables
  const [selectedOption, setSelectedOption] = useState("male"); // selected gender option
  const [show, setShow] = useState(false); // boolean to show/hide date picker
  const [date, setDate] = useState(new Date()); // selected date
  const [name, setName] = useState(""); // patient name
  const [disease, setDisease] = useState(""); // disease name
  const [age, setAge] = useState(); // patient age
  const [cost, setCost] = useState(); // treatment cost
  const [medication, setMedication] = useState(""); // prescribed medication

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate all fields are filled
    if (
      name === "" ||
      disease === "" ||
      age === "" ||
      date === "" ||
      medication === "" ||
      selectedOption === "" ||
      cost === ""
    ) {
      alert("Please fill all data");
      return;
    }

    // Save patient data to Firebase Realtime Database

    try {
      const currentUser = auth.currentUser.uid;
      const patientRef = ref(db, "patients/" + currentUser);
      const newPatientRef = push(patientRef);
      set(newPatientRef, {
        name: name,
        disease: disease,
        medication: medication.split(/,|\n/),
        date: date.toLocaleDateString(),
        age: age,
        cost: cost,
        gender: selectedOption,
      });

      setName("");
      setDisease("");
      setAge("");
      setMedication("");
      setCost("");
    } catch (error) {
      console.log(error);
    }

    alert("form submitted");
  };

  // Function to handle date change in the date picker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setShow(false);
    setDate(currentDate);
  };

  // Function to render each gender option

  const renderOption = (option) => {
    // Check if the current option is selected
    const isSelected = selectedOption === option;

    // Return a TouchableOpacity component with a checkbox and the option text
    return (
      <TouchableOpacity
        key={option}
        onPress={() => setSelectedOption(option)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: isSelected ? "#007AFF" : "#C7C7CC",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isSelected && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#007AFF",
              }}
            />
          )}
        </View>
        <Text style={{ margin: 10 }}>{option}</Text>
      </TouchableOpacity>
    );
  };
  console.log(selectedOption);
  return (
    <>
      <Background />
      <TouchableOpacity
        style={{
          marginTop: 30,
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
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            alignSelf: "center",
            margin: 5,
            position: "absolute",
            bottom: 630,
            height: 70,
            width: 200,
          }}
        />
        {/* <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#ffffff",
            alignSelf: "center",
            borderBottomWidth: 2,
            borderBottomColor: "#ffffff",
            margin: 5,
            position: "absolute",
            bottom: 650,
          }}
        >
          HealthTrack
        </Text> */}
        <Text style={styles.formHeading}>Add Patient Detail</Text>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.form}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Disease"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              value={disease}
              onChangeText={(text) => setDisease(text)}
            />
            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Age"
                placeholderTextColor={"#0268FF"}
                style={[styles.input, { width: 136, marginRight: 25 }]}
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={[styles.input, { width: 136 }]}
                onPress={() => setShow(true)}
              >
                <TextInput
                  placeholder="Date"
                  placeholderTextColor={"#0268FF"}
                  // style={[styles.input, { width: "45%" }]}
                  onChangeText={(text) => setDate(text)}
                  value={date.toLocaleDateString()}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Medication"
              placeholderTextColor={"#0268FF"}
              style={styles.input}
              value={medication}
              onChangeText={(text) => setMedication(text)}
            />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginRight: 10,
                  marginVertical: 10,
                  color: "#0268FF",
                }}
              >
                Gender:
              </Text>
              <Text>
                {renderOption("male")}
                {renderOption("female")}
              </Text>
            </View>
            <TextInput
              placeholder="Cost"
              placeholderTextColor={"#0268FF"}
              style={[styles.input, { width: 130 }]}
              value={cost}
              onChangeText={(text) => setCost(text)}
              keyboardType="numeric"
            />
            <View style={styles.buttonWrapper}>
              <Buttons btn_text={"SUBMIT"} on_press={handleSubmit} />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

export default AddPatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  wrapper: {
    alignItems: "center",
    height: 400,
    width: "100%",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 130,
  },

  formHeading: {
    marginVertical: 40,
    fontSize: 30,
    fontWeight: "700",
    color: "#ffffff",
    position: "absolute",
    bottom: 530,
  },
  form: {
    marginTop: 80,
    width: "90%",
    marginHorizontal: 20,
    height: 320,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    position: "absolute",
  },
  inputGroup: { flexDirection: "row" },
  input: {
    width: 300,
    paddingVertical: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonWrapper: {
    width: 200,
    alignSelf: "center",
    position: "absolute",
    top: 295,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
