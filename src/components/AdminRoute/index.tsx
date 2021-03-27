import { connect } from "react-redux";
import AdminRoute from "./AdminRoute";
import { isUserAdmin } from "src/store";
import { StoreState } from "src/store/types";

const mapStateToProps = (state: StoreState) => ({
  isAdmin: isUserAdmin(state),
});

export default connect(mapStateToProps)(AdminRoute);
