import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { StateType, UserData } from "./types.ts";
import { GreenAPI } from "@api/api.ts";

export const useUserStore = create<StateType>()(
  devtools(
    immer((set) => ({
      // ============= state =============
      loading: false,
      isAuth: false,
      // не стал делать отдельный store для app, т.к. это единственное свойство для него
      appIsInitialized: false,
      userData: {
        idInstance: null,
        apiTokenInstance: null,
        phoneNumber: null,
      },
      messages: [],

      // ============= actions =============
      setAppInitialized: (isInitialized: boolean) => set({ appIsInitialized: isInitialized }),
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
    }))
  )
);
