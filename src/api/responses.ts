export interface AuthResponse {
  stateInstance: "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting";
}

export interface BuildResponse {
  data: unknown;
  error: string | null;
}
