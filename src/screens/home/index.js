import { Text, View, Image, ScrollView } from "react-native";
import Button from "../../components/Button";
import { useProduct } from "../../context/productContext";

export default () => {
  const { products, buy } = useProduct();

  return (
    <ScrollView>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 10,
          textAlign: "center",
          fontSize: 24,
        }}
      >
        Todos os produtos
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "#fff",
                margin: 5,
                borderRadius: 10,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View key={index}>
                <Image
                  source={{ uri: item.image }}
                  alt=""
                  style={{ width: 60, height: 60 }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ textAlign: "center", margin: 5 }}>
                  {item.title}
                </Text>
                <Text>R$ {item.price},00</Text>
                <View>
                  <Button
                    style={{ width: 90, marginBottom: 10, marginTop: 10 }}
                    onPress={() => buy(item)}
                  >
                    Adicionar
                  </Button>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
