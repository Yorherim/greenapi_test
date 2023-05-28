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
