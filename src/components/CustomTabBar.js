import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default ({ state, navigation }) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.touchableOpacity}
      >
        <FontAwesome5
          name="home"
          size={24}
          color="#A6A297"
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.touchableOpacity}
      >
        <FontAwesome5
          name="search"
          size={24}
          color="#A6A297"
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={styles.touchableOpacity}
      >
        <FontAwesome5
          name="shopping-cart"
          size={24}
          color="#A6A297"
          style={{ opacity: state.index === 2 ? 1 : 0.5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("User")}
        style={styles.touchableOpacity}
      >
        <FontAwesome5
          name="user"
          size={24}
          color="#A6A297"
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 50,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
