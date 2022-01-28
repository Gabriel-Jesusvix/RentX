import React from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { ConfirmButton } from "../../components/ConfirmButton";

import { Container, Content, Title, Message, Footer } from "./styles";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}
export function Confirmation() {
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
        <Footer>
          <ConfirmButton title="OK" onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}
