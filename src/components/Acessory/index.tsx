import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";

import { Props } from "./interfaces/Props";

import { Container, Name } from "./styles";

export function Acessory({ name, icon: Icon }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
}
