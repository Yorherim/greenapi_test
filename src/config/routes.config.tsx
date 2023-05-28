import { RouteProps } from "react-router-dom";

import { AuthPage, ChatPage, NotFoundPage } from "@pages/index";

export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
  CHAT = "chat",
  ERROR = "error",
}

export const routesPaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.CHAT]: "/chat",
  [AppRoutes.ERROR]: "*",
};

export const routesConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: routesPaths.main,
    element: <AuthPage />,
  },
  [AppRoutes.AUTH]: {
    path: routesPaths.auth,
    element: <AuthPage />,
  },
  [AppRoutes.CHAT]: {
    path: routesPaths.chat,
    element: <ChatPage />,
  },
  [AppRoutes.ERROR]: {
    path: routesPaths.error,
    element: <NotFoundPage />,
  },
};
