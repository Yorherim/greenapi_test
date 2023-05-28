import { ComponentProps, FC } from "react";

import styles from "./Spinner.module.scss";

export const Spinner: FC<ComponentProps<"svg">> = ({ className, ...props }) => {
  return (
    <svg className={`${styles.spinner} ${className}`} viewBox="0 0 50 50" {...props}>
      <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );
};
