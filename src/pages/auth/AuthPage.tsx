import { FC } from "react";

import styles from "./AuthPage.module.scss";
import { AuthForm } from "@components/index";

// interface AuthProps {}
const AuthPage: FC = () => {
  return (
    <div className={styles.auth}>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
