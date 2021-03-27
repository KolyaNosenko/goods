import Login from "./Login";
import { doLoginUser } from "src/store";
import { connect } from "react-redux";
import { StoreDispatch } from "src/store/types";

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
