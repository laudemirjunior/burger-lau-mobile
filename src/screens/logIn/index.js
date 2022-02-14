import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../components/Logo";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LogIn = async (userData) => {
    await api
      .post("/login", userData)
      .then((response) => {
        AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        navigation.navigate("Tabs");
      })
      .catch(() => alert("Email ou senha incorreta!"));
  };

  return (
    <View style={styles.view_container}>
      <View>
        <View style={styles.view_containerLogo}>
          <Logo />
        </View>
        <View style={styles.view_containerCard}>
          <View style={styles.view_containerIcon}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={30}
              color="#27AE60"
            />
          </View>
          <Text style={styles.text_phase}>
            A vida é como um sanduíche, é preciso recheá-la com os melhores
            ingredientes.
          </Text>
        </View>
      </View>
      <View style={styles.view_containerInput}>
        <View style={styles.view_containerTextInput}>
          <Text style={styles.text_input}>Logar</Text>
        </View>
        <TextInput
          style={styles.textInput_input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput_input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Senha"
        />
        <Button onPress={() => LogIn({ email, password })}>Logar</Button>
        <Text style={styles.text_subTitleInput}>
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button color={false} onPress={() => navigation.navigate("SignUp")}>
          Cadastrar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
  },
  view_containerLogo: {
    width: 300,
    marginBottom: 20,
  },
  view_containerCard: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  view_containerIcon: {
    backgroundColor: "#93d7af",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text_phase: {
    width: 250,
    color: "#828282",
    fontSize: 12,
  },
  view_containerInput: {
    alignItems: "center",
    width: 300,
  },
  view_containerTextInput: {
    width: 300,
  },
  text_input: {
    fontWeight: "bold",
    color: "#828282",
  },
  textInput_input: {
    width: 300,
    height: 40,
    margin: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingLeft: 20,
  },
  text_subTitleInput: {
    width: 300,
    color: "#828282",
    fontSize: 12,
  },
});
