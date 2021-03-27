import Login from "./Login";
import { doLoginUser, StoreDispatch } from "src/store";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    loginUser: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return dispatch(doLoginUser(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
