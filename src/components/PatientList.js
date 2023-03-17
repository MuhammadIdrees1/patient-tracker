import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig";
import { ref, remove } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const PatientList = ({ item }) => {
  const navigation = useNavigation();
  const deletePatient = async (patientId) => {
    try {
      const currentUser = auth.currentUser.uid;
      const patientRef = ref(db, `patients/${currentUser}/${patientId}`);
      await remove(patientRef);
      console.log(`Patient with ID ${patientId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting patient with ID ${patientId}: ${error}`);
    }
  };

  return (
    <View style={styles.ItemView}>
      {/* <Image
                    style={styles.ProductImage}
                    source={require("../assets/images/profileIcon-removebg-preview.png")}
                  /> */}
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Patient Detail Single", item)}
      >
        <View style={styles.NameView}>
          <Text style={{ fontSize: 20, color: "#006FFE" }}>{item.name}</Text>
          <Text style={{ fontSize: 15 }}>{item.disease}</Text>
          <Text style={{ fontSize: 15 }}>{item.date}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => deletePatient(item.id)}>
        <FontAwesome
          name="trash"
          size={27}
          color="#006FFE"
          style={{
            marginRight: 15,
            paddingLeft: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PatientList;

const styles = StyleSheet.create({
  ItemView: {
    backgroundColor: "#ffffff",
    height: 100,
    margin: 10,
    borderRadius: 15,
    borderLeftColor: "#006FFE",
    borderLeftWidth: 5,
    padding: 10,
    elevation: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  NameView: {
    height: 80,
    width: 270,
  },
});
