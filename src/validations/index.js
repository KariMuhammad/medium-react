import * as yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(emailRegex, "Enter valid email")
    .required(),
  password: yup
    .string()
    .min(6)
    .matches(passwordRegex, "Password is not strong enough(a, A, 1, $)")
    .required(),
  fullname: yup.string().min(3).max(50).required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().matches(emailRegex).required(),
  password: yup.string().required(),
});

export const blogSchema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
  content: yup.array().min(3).required("Content is required"),
  banner: yup.string().url().required(),
});

export const saveToDraftSchema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
});
