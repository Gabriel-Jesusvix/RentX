export interface ButtonProps {
  title: string;
  color?: string;
  onPress?: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export interface ButtonPropStyle {
  color: string;
}
