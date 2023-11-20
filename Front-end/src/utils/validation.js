import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Email should be email@email.com").required("Required"),
  password: Yup.string().required("Required"),
});

export const registerValidation = Yup.object().shape({
  email: Yup.string().email("Email should be email@email.com").required("Required"),
  username: Yup.string().required("Required"),
  telephone: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string().required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must be identical"),
});

export const userUpdateValidation = Yup.object().shape({
  email: Yup.string().email("Email should be email@email.com"),
  username: Yup.string(),
  telephone: Yup.string(),
  updatePassword: Yup.boolean(),
  password: Yup.string().when("updatePassword", {
    is: true,
    then: Yup.string().required("The previous password is required"),
  }),
  confirmNewPassword: Yup.string().when("updatePassword", {
    is: true,
    then: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords must be identical"),
  }),
  newPassword: Yup.string().when("updatePassword", {
    is: true,
    then: Yup.string().required("The new password is required"),
  }),
});

export const createDiscussionValidation = Yup.object().shape({
  title: Yup.string().required("The title is required"),
});
