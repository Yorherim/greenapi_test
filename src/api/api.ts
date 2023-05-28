import ky from "ky";
import { UserData } from "@state/types.ts";
import { BuildResponse } from "@api/responses.ts";

export class GreenAPI {
  static baseUrl = "https://api.green-api.com";
  // static IdInstance = "1101825357";
  // static ApiTokenInstance = "3827701e6e49434fbaa3e6664bd90a266f35b06992354116a0";

  /*
   * метод авторизации пользователя
   * ссылка на документацию - https://green-api.com/docs/api/account/GetStateInstance/
   */
  static async auth(userData: UserData) {
    const { idInstance, apiTokenInstance } = userData;

    try {
      const res = await ky
        .get(`${this.baseUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
        .json();
      return this.buildResponse(res);
    } catch (err) {
      return this.buildResponse(null, (err as Error).message);
    }
  }

  private static buildResponse(
    data: unknown = null,
    errorMessage: string | null = null
  ): BuildResponse {
    return {
      data,
      error: errorMessage,
    };
  }
}
