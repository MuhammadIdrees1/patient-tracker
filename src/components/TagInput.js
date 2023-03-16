import React, { useState } from "react";
import { FlatList } from "react-native";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");

  const handleAddTag = () => {
    if (text.trim() !== "") {
      setTags([...tags, text.trim()]);
      setText("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tags}>
        {tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveTag(index)}>
            <Text style={styles.tag}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Add tags..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    height: 200,
  },
  tags: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    marginBottom: 10,
    height: 130,
  },
  tag: {
    backgroundColor: "#eee",
    color: "#666",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
});

export default TagInput;
