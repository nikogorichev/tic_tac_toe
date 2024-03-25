import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import { classNames } from "utils/helpers/classNames";

export enum ThemeButton {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  GREY = "grey",
  ORANGE = "orange",
  CELL = "cell",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  selected?: boolean;
  theme?: ThemeButton;
}

const Button: FC<ButtonProps> = ({
  className,
  selected,
  theme,
  children,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(styles.button, { [styles.selected]: selected }, [
        className || "",
        theme ? styles[theme] : "",
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
