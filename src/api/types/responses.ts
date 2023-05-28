export interface AuthResponse {
  stateInstance: "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting";
}

export interface BuildResponse<T> {
  data: T | null;
  error: string | null;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface ReceiveMessageResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage?: string;
    stateInstance: string;
    senderData?: {
      chatId: string;
      sender: string;
      senderName: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

export interface DeleteNotification {
  result: boolean;
}
