import { FC, HTMLAttributes } from "react";
import styles from "./Button.module.scss";
import { classNames } from "helpers/classNames";

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Cell: FC<CellProps> = ({ className, children, ...otherProps }) => {
  return (
    <div
      className={classNames(styles.cell, {}, [className || ""])}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Cell;
