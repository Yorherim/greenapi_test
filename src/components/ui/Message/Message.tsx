import { ComponentProps, FC } from "react";

import styles from "./Message.module.scss";

interface MessageProps {
  type: "input" | "output";
}
export const Message: FC<MessageProps & ComponentProps<"div">> = ({
  type,
  className,
  ...props
}) => {
  const msgStyles = type === "input" ? styles.input : styles.output;

  return (
    <div className={`${styles.message}  `} {...props}>
      <div className={`${styles["message-container"]} ${msgStyles} ${className}`}> message</div>
    </div>
  );
};
