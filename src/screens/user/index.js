import { View } from "react-native";
import styled from "styled-components/native";
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
    <Container>
      <Button onPress={removeValue}>Sair</Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
