import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import { classNames } from "helpers/classNames";

export enum ThemeButton {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  GREY = "grey",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

const Button: FC<ButtonProps> = ({
  className,
  theme,
  children,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(styles.button, {}, [
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
