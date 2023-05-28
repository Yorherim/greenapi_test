import { FC, memo } from "react";

import styles from "./SpinnerWithWrapper.module.scss";
import { Spinner } from "@components/ui";

export const SpinnerWithWrapper: FC = memo(() => {
  return (
    <div className={styles["spinner-wrapper"]}>
      <Spinner />
    </div>
  );
});
