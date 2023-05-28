import { FC, ForwardedRef, forwardRef } from "react";

import styles from "./Message.module.scss";
import { MessageType } from "@state/types.ts";

interface MessageProps {
  type: MessageType;
  text: string;
}
export const Message: FC<MessageProps> = forwardRef(
  ({ type, text, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    const msgStyles = type === "input" ? styles.input : styles.output;

    return (
      <div className={`${styles.message}`} {...props} ref={ref}>
        <div className={`${styles["message-container"]} ${msgStyles}`}>{text}</div>
      </div>
    );
  }
);
