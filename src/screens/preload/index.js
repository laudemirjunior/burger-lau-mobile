import React, { useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    <Container>
      <Title>Burguer</Title>
      <SubTitle>Lau</SubTitle>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Title = styled.Text`
  font-size: 30px;
  font-weight: 700;
`;
const SubTitle = styled.Text`
  font-size: 26px;
  color: orange;
`;
