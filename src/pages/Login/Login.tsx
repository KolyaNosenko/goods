import { useContext } from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "./LoginForm";
import { LoginContainer } from "./styled";
import { NotificationContext } from "src/context/NotificationContext";
import { InvalidData } from "src/errors";

export interface Props {
  loginUser: (userData: { email: string; password: string }) => Promise<void>;
}

const Login = ({ loginUser }: Props) => {
  const history = useHistory();
  const notify = useContext(NotificationContext);

  const onLoginFormSubmit = async (userData: {
    email: string;
    password: string;
  }) => {
    try {
      await loginUser(userData);
      notify.success("Successfully logged in");
      history.push("/");
    } catch (err) {
      console.error("Failed to login", err);
      // TODO handle diff errors
      if (err instanceof InvalidData) {
        notify.error("Invalid data");
      } else {
        notify.error("Failed to login");
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={onLoginFormSubmit} />
    </LoginContainer>
  );
};

export default Login;
