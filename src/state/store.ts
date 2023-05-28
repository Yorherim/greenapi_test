import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { Message, StateType, UserData } from "./types.ts";
import { GreenAPI } from "@api/api.ts";

export const useUserStore = create<StateType>()(
  devtools(
    immer((set, get) => ({
      // ============= state =============
      loading: false,
      isAuth: false,
      userData: {
        idInstance: null,
        apiTokenInstance: null,
        phoneNumber: null,
      },
      messages: [],

      // ============= actions =============
      // setUserData: (userData: UserData) => set((state) => state),
      // setLoading: (loading: boolean) => set((state) => state),

      // ============= async actions =============
      authUser: async (userData: UserData) => {
        set({ loading: true });

        const result = await GreenAPI.auth(userData);
        if (!result.error) {
          set((state) => {
            state.userData = userData;
            state.isAuth = true;
          });
        }

        set({ loading: false });
        return result;
      },

      sendMessage: async (messageText: string) => {
        set({ loading: true });

        const chatId = `${get().userData.phoneNumber}@c.us`;
        const messageData: Omit<Message, "type" | "id"> = {
          message: messageText,
          chatId,
        };
        const userData: Omit<UserData, "phoneNumber"> = {
          idInstance: get().userData.idInstance,
          apiTokenInstance: get().userData.apiTokenInstance,
        };

        const result = await GreenAPI.sendMessage(userData, messageData);
        set({ loading: false });

        if (result.data) {
          const newMessage: Message = {
            type: "input",
            message: messageText,
            chatId,
            id: result.data.idMessage,
          };
          set((state) => {
            state.messages.push(newMessage);
          });
        }

        return result;
      },
    }))
  )
);
