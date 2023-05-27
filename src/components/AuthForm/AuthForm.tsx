import { ComponentProps, FC } from "react";
import { useForm } from "react-hook-form";

import styles from "./AuthForm.module.scss";
import { InputWithLabel } from "@components/ui";

interface AuthFormProps {}
export const AuthForm: FC<AuthFormProps & ComponentProps<"div">> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles["form-wrapper"]}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputs}>
          <InputWithLabel
            labelName={"ID Instance"}
            propsInput={register("idInstance", {
              required: true,
            })}
            errors={errors}
          />
          <InputWithLabel
            labelName={"API Token Instance"}
            propsInput={register("apiTokenInstance", {
              required: true,
            })}
            errors={errors}
          />
          <InputWithLabel
            labelName={"Phone number"}
            propsInput={{
              ...register("phone number", {
                required: true,
                pattern: {
                  value: /^\+?[1-9][0-9]{7,14}$/,
                  message: "Нужен корректный номер телефона!",
                },
              }),
              type: "tel",
              placeholder: "+71234567890",
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
};
