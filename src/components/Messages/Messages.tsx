import { ComponentProps, FC } from "react";

import styles from "./Messages.module.scss";
import { Message } from "@components/ui";
import { useUserStore } from "@state/store.ts";

export const Messages: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  const messages = useUserStore((state) => state.messages);

  return (
    <div className={styles.messages} {...props}>
      {messages.map((message) => (
        <Message key={`${message.id}${Date.now()}`} type={message.type} text={message.message} />
      ))}
    </div>
  );
};
