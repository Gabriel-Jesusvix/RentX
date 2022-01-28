import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { ButtonProps } from "./interfaces/ButtonProps";

import { Container, Title } from "./styles";

export function Button({
  title,
  color,
  onPress,
  light = false,
  loading = false,
  enabled = true,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      color={color}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
