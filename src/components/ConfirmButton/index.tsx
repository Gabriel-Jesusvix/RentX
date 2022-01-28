import React from "react";
import { ConfirmButtonProps } from "./interfaces/ConfirmButtonProps";

import { Container, Title } from "./styles";

export function ConfirmButton({ title, ...rest }: ConfirmButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
