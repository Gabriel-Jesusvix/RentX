import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface Params {
  user: {
    name: string;
    mail: string;
    driverLicense: string;
  };
}
export function SignUpSecondStep() {
  const route = useRoute();
  const { user } = route.params as Params;
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { goBack, navigate } = useNavigation();

  const theme = useTheme();

  function handleBack() {
    goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação.");
    }
    if (password != passwordConfirm) {
      return Alert.alert("As senhas não iguais.");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.mail,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigate("Confirmation", {
          title: "Conta Criada!",
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoute: "SingIn",
        });
      })
      .catch((error) => {
        return Alert.alert("Ops...", "Não foi possível cadastrar.");
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie sua{"\n"}sua conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              iconName="lock"
              placeholder='"Repetir senha"'
            />
          </Form>

          <Button
            title="Cadastrar"
            enabled={true}
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
