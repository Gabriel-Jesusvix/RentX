import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../../dtos/CarDTO";

export interface CarProps extends RectButtonProps {
  data: CarDTO;
}
