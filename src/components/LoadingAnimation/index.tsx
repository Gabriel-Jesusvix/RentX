import React from "react";

import LottieView from "lottie-react-native";
import LoadingAnimatedLottie from "../../assets/loading_animated.json";
import { Container } from "./styles";

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={LoadingAnimatedLottie}
        autoPlay
        style={{ height: 250 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
