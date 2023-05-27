import { RouteProps } from "react-router-dom";

import { AuthPage, ChatPage } from "@pages/index";

export enum AppRoutes {
  AUTH = "auth",
  CHAT = "chat",
}

export const routesPaths: Record<AppRoutes, string> = {
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.CHAT]: "/chat",
};

export const routesConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.AUTH]: {
    path: routesPaths.auth,
    element: <AuthPage />,
  },
  [AppRoutes.CHAT]: {
    path: routesPaths.chat,
    element: <ChatPage />,
  },
};
