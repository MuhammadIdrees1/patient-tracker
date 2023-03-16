import { TouchableOpacity, View, Text } from "react-native";
// import Colors from "../constants/Colors";

import React from "react";

const Buttons = ({ on_press, btn_text }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#006FFE",
        height: 50,
        marginBottom: 30,
        borderRadius: 18,
      }}
      onPress={on_press}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 1.5,
          textAlign: "center",
          position: "relative",
          color: "#ffffff",
        }}
      >
        {btn_text}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;
