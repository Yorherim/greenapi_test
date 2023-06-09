export enum ErrorsGreenAPI {
  /*
   * HTTP code 400
   */
  "instance in starting process try later" = "Аккаунт находится в процессе запуска/перезапуска. " +
    "Попробуйте повторить попытку спустя несколько секунд.",

  /*
   * HTTP code 400
   */
  "instance account not authorized" = "Аккаунт не авторизован. " +
    "Для авторизации аккаунта перейдите в Личный кабинет " +
    "и считайте QR-код из приложения WhatsApp Business на телефоне.",

  /*
   * HTTP code 400
   */
  "bad request data" = "Данные запроса не валидны. " +
    "Исправьте ошибку в параметрах запроса и повторите попытку.",

  /*
   * HTTP code 429
   */
  "Too Many Requests" = "Пользователь отправил слишком много запросов за заданный промежуток времени. " +
    "Уменьшите частоту запросов. Рекомендации по частоте запросов.",

  /*
   * HTTP code 466
   */
  "correspondentsStatus" = "Исчерпан лимит, подробнее в теле ошибки.",
}
