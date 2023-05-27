import { ComponentProps, FC } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

import styles from "./InputWithLabel.module.scss";

interface InputWithLabelProps {
  propsLabel?: ComponentProps<"label">;
  propsInput: ComponentProps<"input">;
  classNameLabel?: string;
  classNameInput?: string;
  labelName?: string;
  errors?: FieldErrors<FieldValues>;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  propsLabel,
  propsInput,
  classNameLabel,
  classNameInput,
  labelName,
  errors,
}) => {
  return (
    <>
      <label
        htmlFor={propsInput.name}
        className={`${styles.label} ${classNameLabel}`}
        {...propsLabel}
      >
        {labelName ? labelName : propsInput.name}

        <input
          id={propsInput.name}
          className={`${styles.input} ${classNameInput}`}
          {...propsInput}
        />

        {errors?.[`${propsInput.name}`] && (
          <span className={styles.error}>
            {(errors?.[`${propsInput.name}`]?.message as string) || "Нужно заполнитель поле!"}
          </span>
        )}
      </label>
    </>
  );
};
