import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons/";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";

import { api } from "../../services/api";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { LoadingAnimation } from "../../components/LoadingAnimation";

export function Home() {
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGetureEvent = useAnimatedGestureHandler({
    onStart(_, context: any) {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event) {
      positionX.value = event.translationX;
      positionY.value = event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handlerCarDetails(car: CarDTO) {
    navigate("CarDetails", { car });
  }

  function handlerOpenMyCars() {
    navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get("/cars");
        setCars(data);
      } catch (error) {
        console.log("Error dev:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [cars]);

  // Evitar BackButton para Splash;

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(118)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadingAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtactor={(item: CarDTO) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handlerCarDetails(item)} />
          )}
        />
      )}
      {/* <PanGestureHandler onGestureEvent={onGetureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            onPress={handlerOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
