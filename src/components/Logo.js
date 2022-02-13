import { StyleSheet, Text, View } from "react-native";

export default () => (
  <View style={styles.view}>
    <Text style={styles.text_Title}>Burguer</Text>
    <Text style={styles.text_SubTitle}>Lau</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 155,
  },
  text_Title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text_SubTitle: {
    fontSize: 30,
    color: "#eb5757",
  },
});
