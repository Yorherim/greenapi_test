import { ComponentProps, FC } from "react";

import styles from "./PanelChat.module.scss";

export const PanelChat: FC<ComponentProps<"div">> = ({ className, children }) => {
  return <div className={`${styles.panel} ${className}`}>{children}</div>;
};
