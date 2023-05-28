import { ComponentProps, FC } from "react";

import styles from "./Message.module.scss";
import { MessageType } from "@state/types.ts";

interface MessageProps {
  type: MessageType;
  text: string;
}
export const Message: FC<MessageProps & ComponentProps<"div">> = ({
  type,
  text,
  className,
  ...props
}) => {
  const msgStyles = type === "input" ? styles.input : styles.output;

  return (
    <div className={`${styles.message}`} {...props}>
      <div className={`${styles["message-container"]} ${msgStyles} ${className}`}>{text}</div>
    </div>
  );
};
