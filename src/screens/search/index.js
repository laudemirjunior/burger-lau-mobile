import { useState } from "react";
import { View, Image, Text, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native";
import Button from "../../components/Button";
import { useProduct } from "../../context/productContext";
import LottieView from "lottie-react-native";

export default () => {
  const [valueInput, setValueInput] = useState("");
  const { items, buy, filter } = useProduct();

  return (
    <ScrollView>
      <View style={styles.view_container}>
        <TextInput
          style={styles.textInput_input}
          placeholder="Digite aqui..."
          value={valueInput}
          onChangeText={setValueInput}
        />
        <View>
          <Button onPress={() => filter(valueInput)}>Buscar</Button>
        </View>
      </View>
      <View style={styles.view_containerCards}>
        {items.length !== 0 ? (
          items.map((item, index) => {
            return (
              <View key={index} style={styles.view_card}>
                <View key={index} style={styles.view_image}>
                  <Image
                    source={{ uri: item.image }}
                    alt=""
                    style={styles.image}
                  />
                </View>
                <View style={styles.view_texts}>
                  <Text style={styles.text_data}>{item.title}</Text>
                  <Text style={styles.text_data}>R$ {item.price},00</Text>
                </View>
                <View style={styles.view_buttons}>
                  <Button onPress={() => buy(item)}>Comprar</Button>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.view_animate}>
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

const styles = StyleSheet.create({
  view_container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  textInput_input: {
    width: "60%",
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingLeft: 20,
  },
  view_containerCards: {
    justifyContent: "center",
    alignItems: "center",
  },
  view_card: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  view_image: {
    flex: 1,
    marginLeft: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  view_texts: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 20,
    flex: 1,
  },
  text_data: {
    margin: 5,
  },
  view_buttons: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  view_animate: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
});
