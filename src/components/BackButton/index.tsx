import React from "react";
import {} from "react-native";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons/";

import { Container } from "./styles";
import { ColorProps } from "./interfaces/ColorProps";

export function BackButton({ color, ...rest }: ColorProps) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
