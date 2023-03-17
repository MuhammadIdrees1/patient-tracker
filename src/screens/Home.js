import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase/compat";
import { auth, db } from "../../firebaseConfig";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PatientList from "../components/PatientList";
import Buttons from "../components/Buttons";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchWithDate, setSearchWithDate] = useState("");
  const [searchWithName, setSearchWithName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // console.log("hey");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // format date string
    const formattedDate = date.toLocaleDateString();
    // set search with date string
    setSearchWithDate(formattedDate);
    if (date !== "") {
      // filter data by selected date
      const searchResults = data.filter((item) => item.date === formattedDate);
      // set search results to filtered data
      setSearchResults(searchResults);

      hideDatePicker();
    } else {
      // fetch all data
      fetchData();
      // hide date picker modal
      hideDatePicker();
    }
  };

  const handleClearSearch = () => {
    // clear search results and search with date string
    setSearchResults([]);
    setSearchWithDate("");
  };

  const handleSearch = (text) => {
    // set search with name string
    setSearchWithName(text);
    // filter data by search with name string
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    // set search results to filtered data
    setSearchResults(results);
  };
  const clearSearch = () => {
    // clear search results and search with date string
    setSearchWithName("");
    setSearchResults(data);
  };
  useEffect(() => {
    // fetch data when component mounts
    fetchData();

    const currentUser = firebase.auth().currentUser.uid;

    const starCountRef = ref(db, "user/" + currentUser);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserInfo(data);
    });
  }, []);

  const fetchData = () => {
    try {
      const database = firebase.database();
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const myUserId = currentUser.uid;
        const patientListRef = database.ref("patients/" + myUserId);
        // listen for changes in patient data and update state accordingly

        patientListRef.on("value", (snapshot) => {
          const patients = [];
          snapshot.forEach((childSnapshot) => {
            const patient = childSnapshot.val();
            patient.id = childSnapshot.key;
            patients.push(patient);
          });
          setData(patients);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderData = () => {
    if (searchResults.length > 0) {
      // if there are search results, display them in a flat list
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PatientList item={item} />}
        />
      );
    } else if (searchWithName !== "") {
      // if there is a search with name string but no search results, display "Nothing found" message and clear search button

      return (
        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Text style={{ color: "red", fontSize: 16 }}>Nothing found.</Text>
          <View style={{ width: 200 }}>
            <Buttons btn_text={"Clear Search"} on_press={() => clearSearch()} />
          </View>
        </View>
      );
    } else if (searchWithDate !== "") {
      // if there is a search with date string but no search results, display "No results found" message and clear search button

      return (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ color: "red", marginTop: 10 }}>
            No results found for {searchWithDate}.
          </Text>
          <View style={{ width: 200 }}>
            <Buttons
              btn_text={"Clear search"}
              on_press={() => handleClearSearch()}
            />
          </View>
        </View>
      );
    } else if (data.length < 1) {
      // If there are no search results and no data to display, render a message to prompt the user to enter data
      return (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: "#AEB6BF",
              fontWeight: "800",
              textAlign: "center",
              marginHorizontal: 20,
              marginVertical: 100,
            }}
          >
            "Your data can make all the difference. Enter it now and see the
            results."
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PatientList item={item} />}
        />
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/background.jpg")}
          style={styles.Image}
        />
        <View
          style={{
            position: "absolute",
            fontSize: 30,
            fontWeight: "700",
            color: "#ffffff",
            height: 100,
            width: 300,
            marginHorizontal: 30,
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{
              alignSelf: "center",
              height: 70,
              width: 200,
              marginTop: 20,
              marginBottom: 5,
            }}
          />

          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "#ffffff",
              marginTop: 2,
            }}
          >
            Hello {userInfo.name}!
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "#ffffff",
            }}
          >
            "Effortlessly manage your patients' records"
          </Text>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search here"
            placeholderTextColor={"#006FFE"}
            onChangeText={handleSearch}
            value={searchWithName}
            maxLength={30}
            onClear={clearSearch}
          />
          <TouchableOpacity onPress={showDatePicker}>
            <MaterialIcons
              name="date-range"
              size={24}
              color="#006FFE"
              style={{ borderLeftWidth: 1, paddingLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>{renderData()}</View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          value={searchWithDate}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcfc",
    // backgroundColor: "#ffffff",
  },
  Image: {
    height: 200,
    width: "100%",
  },
  listContainer: {
    marginTop: 30,
    height: 500,
    paddingBottom: 60,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginRight: 10,
    position: "absolute",
    top: 175,
    alignSelf: "center",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 50,
    paddingLeft: 20,
    elevation: 3,
  },

  // ProductImage: { marginLeft: 10, height: 70, width: 70, borderRadius: 50 },
});
