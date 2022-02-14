import { Image, Text, View, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default () => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    setCart(JSON.parse((await AsyncStorage.getItem("cart")) || []));
  };

  useFocusEffect(
    useCallback(() => {
      getCart();
    }, [])
  );

  const remove = async (data) => {
    const newCart = await cart.filter((_, index) => index !== data);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
    getCart();
  };

  const addDecrease = async (data, index, operation) => {
    if (operation === "add") {
      data.amount += 1;
    }
    if (operation === "decrement" && data.amount !== 1) {
      data.amount -= 1;
    }
    let cart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
    cart.splice(index, 1, data);
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1],
    });
    const Style = {
      transform: [
        {
          scale,
        },
      ],
    };

    return (
      <View style={styles.view_buttons}>
        <Button style={([Style], styles.view_button)}>
          <FontAwesome name="trash" size={18} color="white" />
        </Button>
      </View>
    );
  };

  return (
    <>
      <ScrollView>
        <View>
          <Text style={styles.text}>Meus produtos</Text>
        </View>

        <GestureHandlerRootView style={styles.view}>
          {cart.length !== 0 ? (
            cart.map((item, index) => {
              return (
                <View key={index} style={styles.view_container}>
                  <Swipeable
                    renderRightActions={renderRightActions}
                    onSwipeableRightOpen={() => remove(index)}
                  >
                    <View key={index} style={styles.view_container}>
                      <View key={index} style={styles.view_image}>
                        <Image
                          source={{ uri: item.image }}
                          alt={item.title}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.view_card}>
                        <Text style={styles.text_title}>{item.title}</Text>
                        <Text style={styles.text_subTitle}>
                          Unitário: R$ {item.price},00
                        </Text>
                        <Text style={styles.text_subTitle}>
                          Total: R$ {item.price * item.amount},00
                        </Text>
                      </View>
                      <View style={styles.view_buttons}>
                        <View style={styles.view_button}>
                          <Button
                            onPress={() =>
                              addDecrease(item, index, "decrement")
                            }
                          >
                            <FontAwesome name="minus" size={18} color="white" />
                          </Button>
                        </View>

                        <Text style={styles.text_amount}>{item.amount}</Text>
                        <View style={styles.view_button}>
                          <Button
                            onPress={() => addDecrease(item, index, "add")}
                          >
                            <FontAwesome name="plus" size={18} color="white" />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </Swipeable>
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
        </GestureHandlerRootView>
      </ScrollView>
      {cart.length !== 0 && (
        <View style={styles.view_cardPayment}>
          <View style={styles.view_values}>
            <Text>Total:</Text>
            <Text>
              R${" "}
              {parseFloat(
                cart.reduce((max, cur) => max + cur.price * cur.amount, 0)
              )}
              ,00
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 55,
  },
  view_container: {
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  view_image: {
    flex: 1,
    marginLeft: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  view_card: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 20,
    flex: 1,
  },
  text_title: {
    marginBottom: 5,
  },
  text_subTitle: {
    marginTop: 5,
  },
  view_buttons: {
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  view_button: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
    width: 35,
  },
  text_amount: {
    width: 20,
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  view_cardPayment: {
    justifyContent: "center",
    alignItems: "center",
  },
  view_values: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 10,
    width: "98%",
    height: 50,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  },
  view_animate: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
});
