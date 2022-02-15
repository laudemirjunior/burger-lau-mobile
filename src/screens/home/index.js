import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { useProduct } from "../../context/productContext";

export default () => {
  const { products, buy } = useProduct();

  return (
    <ScrollView>
      <Text style={styles.text}>Todos os produtos</Text>
      <View style={styles.view_container}>
        {products.map((item, index) => {
          return (
            <View key={index} style={styles.view_card}>
              <View key={index}>
                <Image
                  source={{ uri: item.image }}
                  alt=""
                  style={styles.image}
                />
              </View>
              <View style={styles.view_texts}>
                <Text style={styles.text_title}>{item.title}</Text>
                <Text>R$ {item.price},00</Text>
                <View>
                  <Button onPress={() => buy(item)}>Adicionar</Button>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
  },
  view_container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  view_card: {
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  view_texts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_title: {
    textAlign: "center",
    margin: 5,
  },
});
