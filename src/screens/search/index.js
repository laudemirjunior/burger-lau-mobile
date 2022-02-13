import { useState } from "react";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import Button from "../../components/Button";
import { useProduct } from "../../context/productContext";
import LottieView from "lottie-react-native";

export default () => {
  const [valueInput, setValueInput] = useState("");
  const { items, buy, filter } = useProduct();

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <Input
          placeholder="Digite aqui..."
          value={valueInput}
          onChangeText={setValueInput}
        />
        <Button style={{ width: 60 }} onPress={() => filter(valueInput)}>
          Buscar
        </Button>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.length !== 0 ? (
          items.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  margin: 5,
                  borderRadius: 10,
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View key={index} style={{ flex: 1, marginLeft: 20 }}>
                  <Image
                    source={{ uri: item.image }}
                    alt=""
                    style={{ width: 80, height: 80 }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginRight: 20,
                    flex: 1,
                  }}
                >
                  <Text style={{ marginBottom: 5 }}>{item.title}</Text>
                  <Text style={{ marginTop: 5 }}>R$ {item.price},00</Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <Button style={{ width: 90 }} onPress={() => buy(item)}>
                    Comprar
                  </Button>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              width: "100%",
              height: 500,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              source={require("../../assets/cart.json")}
              autoPlay
              loop
              speed={0.6}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const Input = styled.TextInput`
  width: 300px;
  height: 40px;
  margin: 5px;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding-left: 20px;
`;
