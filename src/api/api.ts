import ky from "ky";
import { Message, UserData } from "@state/types.ts";
import {
  AuthResponse,
  BuildResponse,
  ReceiveMessageResponse,
  SendMessageResponse,
} from "@api/types/responses.ts";

export class GreenAPI {
  static baseUrl = "https://api.green-api.com";
  // static IdInstance = "1101825357";
  // static ApiTokenInstance = "3827701e6e49434fbaa3e6664bd90a266f35b06992354116a0";

  /*
   * метод авторизации пользователя
   * ссылка на документацию - https://green-api.com/docs/api/account/GetStateInstance/
   */
  static async auth(
    userData: Omit<UserData, "phoneNumber">
  ): Promise<BuildResponse<AuthResponse | null>> {
    const { idInstance, apiTokenInstance } = userData;

    try {
      const result: AuthResponse = await ky
        .get(`${this.baseUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
        .json();
      return this.buildResponse<AuthResponse>(result);
    } catch (err) {
      return this.buildResponse(null, (err as Error).message);
    }
  }

  /*
   * метод для отправки сообщения
   * ссылка на документацию - https://green-api.com/docs/api/sending/SendMessage/
   */
  static async sendMessage(
    userData: Omit<UserData, "phoneNumber">,
    messageData: Omit<Message, "type" | "id">
  ): Promise<BuildResponse<SendMessageResponse | null>> {
    const { idInstance, apiTokenInstance } = userData;

    try {
      const result: SendMessageResponse = await ky
        .post(`${this.baseUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
          json: messageData,
        })
        .json();
      return this.buildResponse<SendMessageResponse>(result);
    } catch (err) {
      return this.buildResponse(null, (err as Error).message);
    }
  }

  static async getMessage(userData: Omit<UserData, "phoneNumber">, chatId: string) {
    const { idInstance, apiTokenInstance } = userData;

    try {
      const receiveNotification: ReceiveMessageResponse = await ky
        .get(`${this.baseUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
        .json();

      if (!receiveNotification) return;

      // deleteNotification
      await ky
        .delete(
          `${this.baseUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiveNotification.receiptId}`
        )
        .json();

      // игнорируем все уведомления, кроме уведомлений с сообщениями
      if (
        receiveNotification.body.senderData?.chatId === chatId &&
        receiveNotification.body.messageData?.textMessageData.textMessage
      ) {
        return this.buildResponse({
          message: receiveNotification.body.messageData.textMessageData.textMessage,
          messageId: receiveNotification.body.idMessage,
        });
      }
    } catch (err) {
      return this.buildResponse(null, (err as Error).message);
    }
  }

  private static buildResponse<T>(
    data: T | null = null,
    errorMessage: string | null = null
  ): BuildResponse<T> {
    return {
      data,
      error: errorMessage,
    };
  }
}
