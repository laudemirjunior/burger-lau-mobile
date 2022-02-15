import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ children, color = true, ...rest }) => (
  <TouchableOpacity {...rest} style={styles.touchableOpacity(color)}>
    <Text style={styles.text(color)}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchableOpacity: (color) => ({
    backgroundColor: color ? "#27ae60" : "#E0E0E0",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  }),
  text: (color) => ({
    color: color ? "#ffffff" : "#999999",
    fontSize: 16,
    fontWeight: "bold",
  }),
});
