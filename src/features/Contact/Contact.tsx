import React from "react";
import { init, send } from "@emailjs/browser";
import { useForm } from "react-hook-form";
import styles from "./Contact.module.css";

interface InputTypes {
  name: string;
  title: string;
  email: string;
  content: string;
}

const TestForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputTypes>();

  const onsubmit = async (data: InputTypes) => {
    const userID = process.env.REACT_APP_EMAIL_API_KEY;
    const serviceID = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;

    if (userID && serviceID && templateID) {
      init(userID);

      const params = {
        name: data.name,
        title: data.title,
        email: data.email,
        content: data.content,
      };

      try {
        await send(serviceID, templateID, params, userID);
        alert("お問い合わせを受け付けました。");
        reset();
      } catch (error) {
        alert("お問い合わせの受付に失敗しました。");
      }
    }
  };

  return (
    <div className={styles.ContactWrapper}>
      <h2>お問い合わせ</h2>
      <form onSubmit={handleSubmit(onsubmit)} className={styles.ContactForm}>
        <div>
          <label htmlFor="name">お名前</label>
          <input
            id="name"
            {...register("name", { required: "お名前は必須項目です。" })}
          />
          {errors.name && (
            <p className={styles.ErrorMessage}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            {...register("title", { required: "タイトルは必須項目です。" })}
          />
          {errors.title && (
            <p className={styles.ErrorMessage}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "メールアドレスは必須項目です。",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "有効なメールアドレスを入力してください。",
              },
            })}
          />
          {errors.email && (
            <p className={styles.ErrorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content">お問い合わせ内容</label>
          <textarea
            id="content"
            {...register("content", {
              required: "お問い合わせ内容は必須項目です。",
            })}
          />
          {errors.content && (
            <p className={styles.ErrorMessage}>{errors.content.message}</p>
          )}
        </div>

        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default TestForm;
