import { connect } from "react-redux";
import AdminRoute from "./AdminRoute";
import { isUserAdmin, StoreState } from "src/store";

const mapStateToProps = (state: StoreState) => ({
  isAdmin: isUserAdmin(state),
});

export default connect(mapStateToProps)(AdminRoute);
