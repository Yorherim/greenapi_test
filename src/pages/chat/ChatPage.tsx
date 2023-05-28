import { ChangeEvent, FC, MutableRefObject, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import styles from "./ChatPage.module.scss";
import { PanelChat, Message } from "@components/ui";
import { useUserStore } from "@state/store.ts";

const ChatPage: FC = () => {
  const [messageText, setMessageText] = useState("");
  const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const isAuth = useUserStore((state) => state.isAuth);

  const handlerChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.currentTarget.value);

    // высчитываем количество строк в textarea
    // 24 - line height
    const linesCount = Math.floor(textareaRef.current.scrollHeight / 24);

    if (linesCount > 5) {
      // если строк больше 5, то делаем прокрутку, как в whatsup
      textareaRef.current.style.overflowY = "auto";
    } else {
      // иначе просто увеличиваем высоту textarea
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.overflowY = "hidden";
    }
  };

  if (!isAuth) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className={styles["chat-page"]}>
      <div className={styles.chat}>
        <PanelChat className={styles.panel} />

        <div className={styles.messages}>
          <Message type={"input"} />
          <Message type={"output"} />
        </div>

        <PanelChat className={`${styles.panel} ${styles.footer}`}>
          <textarea
            value={messageText}
            className={styles["input-message"]}
            onChange={handlerChangeMessage}
            placeholder={"Введите сообщение"}
            ref={textareaRef}
            rows={1}
            autoFocus
          />
        </PanelChat>
      </div>
    </div>
  );
};

export default ChatPage;
