import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import { Navigate } from "react-router-dom";

import styles from "./ChatPage.module.scss";
import { PanelChat } from "@components/ui";
import { useUserStore } from "@state/store.ts";
import { Messages } from "@components/Messages/Messages.tsx";
import { SendMessageIcon } from "@components/ui/icons";

const ChatPage: FC = () => {
  const [messageText, setMessageText] = useState("");
  const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const isAuth = useUserStore((state) => state.isAuth);
  const sendMessage = useUserStore((state) => state.sendMessage);
  const getMessage = useUserStore((state) => state.getMessage);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getMessage();
    }, 1500);

    return () => clearInterval(intervalId);
  }, [getMessage]);

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

  const addMessage = async () => {
    if (!messageText.trim().length) return;

    const text = messageText;
    setMessageText("");
    // 24 - line height, 18 - paddings
    textareaRef.current.style.height = `${24 + 18}px`;
    await sendMessage(text);
  };

  const handlerKeyDownSendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await addMessage();
    }
  };

  const handlerClickSendMessage = async () => {
    await addMessage();
  };

  if (!isAuth) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className={styles["chat-page"]}>
      <div className={styles.chat}>
        <PanelChat className={styles.panel} />

        <Messages />

        <PanelChat className={`${styles.panel} ${styles.footer}`}>
          <>
            <textarea
              value={messageText}
              className={styles["input-message"]}
              onChange={handlerChangeMessage}
              onKeyDown={handlerKeyDownSendMessage}
              placeholder={"Введите сообщение"}
              ref={textareaRef}
              rows={1}
              autoFocus
            />
            <SendMessageIcon
              className={styles["send-message-btn"]}
              onClick={handlerClickSendMessage}
            />
          </>
        </PanelChat>
      </div>
    </div>
  );
};

export default ChatPage;
