import { FC, useCallback, useState } from "react";

import styles from "./AuthPage.module.scss";
import { AuthForm } from "@components/index";
import { useUserStore } from "@state/store.ts";
import { Navigate } from "react-router-dom";
import { Spinner } from "@components/ui";

// interface AuthProps {}
const AuthPage: FC = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const loading = useUserStore((state) => state.loading);
  const [errorAuthForm, setErrorAuthForm] = useState("");

  const handlerErrorAuthForm = useCallback((errorMessage: string) => {
    setErrorAuthForm(errorMessage);
  }, []);

  if (isAuth) {
    return <Navigate to={"/chat"} />;
  }

  return (
    <div className={styles.auth}>
      {errorAuthForm && <span className={styles.error}>{errorAuthForm}</span>}
      {loading && <Spinner className={styles.spiner} />}

      <AuthForm handlerErrorAuthForm={handlerErrorAuthForm} />
    </div>
  );
};

export default AuthPage;
