import { ComponentProps, FC, MutableRefObject, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import styles from "./Messages.module.scss";
import { Message } from "@components/ui";
import { useUserStore } from "@state/store.ts";

export const Messages: FC<ComponentProps<"div">> = ({ className, ...props }) => {
  const lastMessageRef = useRef() as MutableRefObject<HTMLDivElement>;
  const messages = useUserStore((state) => state.messages);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.messages} {...props}>
      <div className={styles["messages-wrapper"]}>
        {messages.map((message, i) => (
          <Message
            key={`${message.id}${nanoid()}`}
            type={message.type}
            text={message.message}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            ref={i === messages.length - 1 ? lastMessageRef : null}
          />
        ))}
      </div>
    </div>
  );
};
