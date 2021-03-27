import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Header from "./Header";
import { doLogoutUser, getUser, StoreDispatch, StoreState } from "src/store";

const mapStateToProps = (state: StoreState, props: RouteComponentProps) => ({
  user: getUser(state),
  loginUser: () => props.history.push("/login"),
});

const mapDispatchToProps = (dispatch: StoreDispatch) => ({
  logoutUser: async () => dispatch(doLogoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
