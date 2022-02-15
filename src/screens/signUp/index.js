import Logo from "../../components/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../../components/Button";
import api from "../../services";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singUp = () => {
    api
      .post("/register", { name, email, password })
      .then(() => {
        navigation.navigate("LogIn");
      })
      .then(() => alert("Sua conta foi criada com sucesso!"))
      .catch(() =>
        alert("Erro ao criar sua conta, tente novamente com outro email!")
      );
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
          <Text style={styles.text_input}>Cadastrar</Text>
        </View>
        <TextInput
          style={styles.textInput_input}
          value={name}
          onChangeText={setName}
          placeholder="Nome"
        />

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
        <Button onPress={() => singUp()}>Cadastrar</Button>
        <Text style={styles.text_subTitleInput}>
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button color={false} onPress={() => navigation.navigate("LogIn")}>
          Logar
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
    marginBottom: 45,
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
