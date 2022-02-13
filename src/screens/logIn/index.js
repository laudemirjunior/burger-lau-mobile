import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../components/Logo";
import styled from "styled-components/native";

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
    <Container>
      <ContainerInfo>
        <ContainerLogo>
          <Logo />
        </ContainerLogo>
        <ContainerCard>
          <ContainerIcon>
            <MaterialCommunityIcons
              name="cart-outline"
              size={30}
              color="#27AE60"
            />
          </ContainerIcon>
          <ContainerText>
            A vida é como um sanduíche, é preciso recheá-la com os melhores
            ingredientes.
          </ContainerText>
        </ContainerCard>
      </ContainerInfo>
      <ContainerInput>
        <ContainerTextInput>
          <TextInput>Logar</TextInput>
        </ContainerTextInput>
        <Input value={email} onChangeText={setEmail} placeholder="Email" />
        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Senha"
        />
        <Button onPress={() => LogIn({ email, password })}>Logar</Button>
        <SubTitleInput>
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </SubTitleInput>
        <Button color={false} onPress={() => navigation.navigate("SignUp")}>
          Cadastrar
        </Button>
      </ContainerInput>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const ContainerInfo = styled.View``;

const ContainerLogo = styled.View`
  width: 300px;
  margin-bottom: 20px;
`;

const ContainerCard = styled.View`
  width: 300px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ContainerIcon = styled.View`
  background-color: #93d7af;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ContainerText = styled.Text`
  width: 250px;
  color: #828282;
  font-size: 12px;
`;

const ContainerInput = styled.View`
  align-items: center;
`;

const ContainerTextInput = styled.View`
  width: 300px;
`;

const TextInput = styled.Text`
  font-weight: bold;
  color: #828282;
`;

const Input = styled.TextInput`
  width: 300px;
  height: 40px;
  margin: 5px;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding-left: 20px;
`;

const SubTitleInput = styled.Text`
  width: 300px;
  color: #828282;
  font-size: 12px;
`;
