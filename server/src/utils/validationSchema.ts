import * as yup from "yup";

export const CreateUserScheama = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
  email: yup.string().required("Email is missing").email("Invalid email id!"),
  password: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(8, "Password is too short!")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/,
      "Pasword is too simple!"
    ),
});

CreateUserScheama.validate()
