import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default ({ navigation }) => {
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token === null) {
        return navigation.navigate("LogIn");
      } else {
        return navigation.navigate("Tabs");
      }
    } catch (e) {
      alert("erro");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.view_container}>
      <ActivityIndicator color={"#93d7af"} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
