import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";

export default ({ navigation }) => {
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("LogIn");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.view_container}>
      <Button onPress={removeValue}>Sair</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
