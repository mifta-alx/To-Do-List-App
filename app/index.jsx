import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CheckBox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
export default function App() {
  const [task, setTask] = useState([
    { text: "Write an documentation", completed: false },
    { text: "Jogging", completed: false },
  ]);
  const [text, setText] = useState("");
  const handleAddTask = () => {
    if (text !== "") {
      const newTask = { text, completed: false };
      setTask([...task, newTask]);
      setText("");
    }
  };
  const handleRemoveTask = (index) => {
    const updatedTask = [...task];
    updatedTask.splice(index, 1);
    setTask(updatedTask);
  };
  const handleCompletedTask = (index, state) => {
    const updatedTask = task.map((item, itemIndex) =>
      itemIndex === index ? { ...item, completed: state } : item
    );
    setTask(updatedTask);
  };
  const completedTask = task.filter((item) => item.completed === true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
            }}
          >
            Task Done
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Keep it up
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#006d77",
            borderRadius: 100,
            width: 90,
            height: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color: "#fff",
              lineHeight: 38,
              fontWeight: "300",
            }}
          >
            {completedTask.length}/{task.length}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your new task"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={styles.buttonCircle}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.buttonLabel}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {task.map((item, index) => (
          <View style={styles.item} key={index}>
            <CheckBox
            
              value={item.completed}
              onValueChange={(newValue) => handleCompletedTask(index, newValue)}
            />
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.itemTitle,
                  {
                    color: item.completed ? "#adb5bd" : "#000",
                    textDecorationLine: item.completed ? "line-through" : "",
                  },
                ]}
              >
                {item.text}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveTask(index)}
                style={{
                  backgroundColor: "#006d77",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 25,
                  height: 25,
                }}
              >
                <View
                  style={{ height: 1.5, width: 10, backgroundColor: "#fff" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#f8f9fa",
    gap: 14,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#ced4da",
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: "#e9ecef",
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonCircle: {
    backgroundColor: "#006d77",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 36,
  },
  item: {
    flexDirection: "row",
    gap: 14,
    padding: 10,
  },
  itemTitle: {
    textTransform: "capitalize",
    fontWeight: "400",
  },
});
