import { BuildResponse } from "@api/responses.ts";

export interface UserData {
  idInstance: string | null;
  apiTokenInstance: string | null;
  phoneNumber: string | null;
}

export type MessageType = "input" | "output";

export interface Message {
  type: MessageType;
  text: string;
}

export interface StateType {
  loading: boolean;
  isAuth: boolean;
  appIsInitialized: boolean;
  userData: UserData;
  messages: Message[];

  // ============= actions =============
  setAppInitialized: (isInitialized: boolean) => void;
  // setUserData: (userData: UserData) => void;
  // setLoading: (loading: boolean) => void;

  // ============= async actions =============
  authUser: (userData: UserData) => Promise<BuildResponse>;
}
