import { AuthResponse, BuildResponse, SendMessageResponse } from "@api/types/responses.ts";

export interface UserData {
  idInstance: string | null;
  apiTokenInstance: string | null;
  phoneNumber: string | null;
}

export type MessageType = "input" | "output";

export interface Message {
  type: MessageType;
  message: string;
  chatId: string;
  id: string;
}

export interface StateType {
  loading: boolean;
  isAuth: boolean;
  userData: UserData;
  messages: Message[];

  // ============= actions =============
  // setUserData: (userData: UserData) => void;
  // setLoading: (loading: boolean) => void;

  // ============= async actions =============
  authUser: (userData: UserData) => Promise<BuildResponse<AuthResponse | null>>;
  sendMessage: (messageText: string) => Promise<BuildResponse<SendMessageResponse | null>>;
}
