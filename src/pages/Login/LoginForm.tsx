import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import FormControlInput from "src/components/FormControlInput";
import FormControlText from "src/components/FormControlText";
import FormControl from "src/components/FormControl";
import FormControlLabel from "src/components/FormControlLabel";
import {
  Form,
  FormBody,
  FormHeader,
  FormSubmitWrapper,
  FormTitle,
} from "./styled";
import { isEmailValid, isPasswordValid } from "src/services/user";
import { PrimaryButton } from "src/components/Button";
import Spinner from "src/components/Spinner";

interface UserData {
  email: string;
  password: string;
}

export interface Props {
  onSubmit: (userData: UserData) => Promise<void>;
}

function validate(values: UserData) {
  const errors: { email?: string; password?: string } = {};
  const email = values.email.trim();
  const password = values.password.trim();

  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmailValid(email)) {
    errors.email = "Invalid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!isPasswordValid(password)) {
    errors.password = "Password too short. Must be at least 5 symbols";
  }

  return errors;
}

const LoginForm = ({ onSubmit }: Props) => {
  const emailField = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!emailField.current) return;

    emailField.current.focus();
  }, []);

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await onSubmit({
        email: values.email.trim(),
        password: values.password.trim(),
      });
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>Login</FormTitle>
      </FormHeader>
      <FormBody>
        <FormControl>
          <FormControlLabel htmlFor="email">Email</FormControlLabel>
          <FormControlInput
            id="email"
            type="text"
            placeholder="Enter email"
            {...getFieldProps("email")}
            ref={emailField as any}
          />
          {touched.email && errors.email && (
            <FormControlText>{errors.email}</FormControlText>
          )}
        </FormControl>
        <FormControl>
          <FormControlLabel htmlFor="password">Password</FormControlLabel>
          <FormControlInput
            id="password"
            type="password"
            placeholder="Enter password"
            {...getFieldProps("password")}
          />
          {touched.password && errors.password && (
            <FormControlText>{errors.password}</FormControlText>
          )}
        </FormControl>
        <FormSubmitWrapper>
          <PrimaryButton
            type="submit"
            startIcon={isSubmitting && <Spinner size="16px" />}
            disabled={isSubmitting}
          >
            Login
          </PrimaryButton>
        </FormSubmitWrapper>
      </FormBody>
    </Form>
  );
};

export default LoginForm;
