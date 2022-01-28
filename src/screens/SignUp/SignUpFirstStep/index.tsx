import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
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
import { useAuth } from "../../../hooks/auth";

export function SignUpFirstStep() {
  const { goBack, navigate } = useNavigation();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const { user } = useAuth();

  function handleBack() {
    goBack();
  }
  async function handleNextStep() {
    try {
      const scheme = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        mail: Yup.string().email("E-mail invalido").required("E-mail inválido"),
        name: Yup.string().required("Nome é obrigatório"),
      });
      const data = { name, mail, driverLicense };
      await scheme.validate(data);

      navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
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
            <FormTitle>Dados</FormTitle>
            <Input
              value={name}
              onChangeText={setName}
              iconName="user"
              placeholder="Nome"
            />
            <Input
              value={mail}
              onChangeText={setMail}
              iconName="mail"
              autoCapitalize="none"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              value={driverLicense}
              onChangeText={setDriverLicense}
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
