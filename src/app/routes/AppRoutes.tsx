import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routesConfig } from "@config/routes.config.tsx";

export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        {Object.values(routesConfig).map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
};
