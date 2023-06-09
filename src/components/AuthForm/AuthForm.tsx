import { ComponentProps, FC, memo } from "react";
import { FieldValues, useForm } from "react-hook-form";

import styles from "./AuthForm.module.scss";
import { InputWithLabel } from "@components/ui";
import { useUserStore } from "@state/store.ts";
import { UserData } from "@state/types.ts";
import { AuthResponse, BuildResponse } from "@api/types/responses.ts";

interface AuthForm {
  handlerErrorAuthForm: (errorMessage: string) => void;
}

export const AuthForm: FC<AuthForm & ComponentProps<"div">> = memo(({ handlerErrorAuthForm }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({ mode: "onBlur" });
  const authUser = useUserStore((state) => state.authUser);

  const onSubmit = async (data: FieldValues) => {
    handlerErrorAuthForm("");

    const result: BuildResponse<AuthResponse | null> = await authUser(data as UserData);

    if (result.error) {
      handlerErrorAuthForm(result.error);
    } else {
      reset();
    }
  };

  const handlerClearErrors = (nameInput: string) => {
    clearErrors(nameInput);
    handlerErrorAuthForm("");
  };

  return (
    <div className={styles["form-wrapper"]}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <InputWithLabel
            labelName={"ID Instance"}
            propsInput={register("idInstance", {
              required: true,
              onChange: () => handlerClearErrors("idInstance"),
            })}
            errors={errors}
          />
          <InputWithLabel
            labelName={"API Token Instance"}
            propsInput={register("apiTokenInstance", {
              required: true,
              onChange: () => handlerClearErrors("apiTokenInstance"),
            })}
            errors={errors}
          />
          <InputWithLabel
            labelName={"Phone number"}
            propsInput={{
              ...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Нужен корректный номер телефона!",
                },
                onChange: () => handlerClearErrors("phoneNumber"),
              }),
              type: "tel",
              placeholder: "71234567890",
            }}
            errors={errors}
          />
        </div>

        <input
          type="submit"
          className={styles.submit}
          disabled={Boolean(Object.keys(errors).length)}
        />
      </form>
    </div>
  );
});
