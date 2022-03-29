import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
    setCart(JSON.parse(await AsyncStorage.getItem("cart")) || []);
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

  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.touchableOpacityRed}>
        <FontAwesome name="trash" size={18} color="white" />
      </TouchableOpacity>
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
                    <View key={index} style={styles.view_containerInter}>
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
                        <TouchableOpacity
                          style={styles.touchableOpacity}
                          onPress={() => addDecrease(item, index, "decrement")}
                        >
                          <FontAwesome name="minus" size={18} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text_amount}>{item.amount}</Text>
                        <TouchableOpacity
                          style={styles.touchableOpacity}
                          onPress={() => addDecrease(item, index, "add")}
                        >
                          <FontAwesome name="plus" size={18} color="white" />
                        </TouchableOpacity>
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
  view_containerInter: {
    width: "93%",
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
    marginRight: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text_title: {
    marginBottom: 5,
  },
  text_subTitle: {
    marginTop: 5,
  },
  view_buttons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_amount: {
    width: 20,
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
  touchableOpacity: {
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  touchableOpacityRed: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 40,
    marginRight: 26,
  },
});
