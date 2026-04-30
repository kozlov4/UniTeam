export const validateEmail = (email) => {
  if (!email) return "Пошта обов'язкова";
  if (!email.endsWith("@nure.ua")) return "Використовуйте пошту @nure.ua";
  const emailRegex = /^[^\s@]+@nure.ua$/;
  if (!emailRegex.test(email)) return "Невірний формат пошти";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Пароль обов'язковий";
  const passwordRegex = /^\S{8,}$/;
  if (!passwordRegex.test(password)) return "Мінімум 8 символів без пробілів";
  return "";
};
