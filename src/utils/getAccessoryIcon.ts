import SpeedSvgIcon from "../assets/speed.svg";
import AccelerationSvgIcon from "../assets/acceleration.svg";
import ForceSvgIcon from "../assets/force.svg";
import GasolineSvgIcon from "../assets/gasoline.svg";
import EnergySvgIcon from "../assets/energy.svg";
import HybridSvgIcon from "../assets/hybrid.svg";
import ExchangeSvgIcon from "../assets/exchange.svg";
import PeopleSvgIcon from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

export function getAccessoryIcon(type: string) {
  switch (type) {
    case "speed":
      return SpeedSvgIcon;
    case "acceleration":
      return AccelerationSvgIcon;
    case "turning_diameter":
      return ForceSvgIcon;
    case "gasoline_motor":
      return GasolineSvgIcon;
    case "electric_motor":
      return EnergySvgIcon;
    case "hybrid_motor":
      return HybridSvgIcon;
    case "exchange":
      return ExchangeSvgIcon;
    case "seats":
      return PeopleSvgIcon;
    default:
      return CarSvg;
  }
}
