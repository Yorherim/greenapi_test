import { FC, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routesConfig } from "@config/routes.config.tsx";
import { SpinnerWithWrapper } from "@components/ui";

export const AppRoutes: FC = () => {
  return (
    <Suspense fallback={<SpinnerWithWrapper />}>
      <Routes>
        {Object.values(routesConfig).map(({ element, path }) => (
          <Route key={path} element={element} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
};
