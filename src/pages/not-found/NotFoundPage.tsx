import { FC } from "react";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFoundPage;
