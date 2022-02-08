import { RectButtonProps } from "react-native-gesture-handler";
import { Car } from "../../../database/Models/Car";

export interface CarProps extends RectButtonProps {
  data: Car;
}
