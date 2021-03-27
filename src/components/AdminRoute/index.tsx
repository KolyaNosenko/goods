import { connect } from "react-redux";
import AdminRoute from "./AdminRoute";
import { isUserAdmin } from "../../store";
import { StoreState } from "../../store/types";

const mapStateToProps = (state: StoreState) => ({
  isAdmin: isUserAdmin(state),
});

export default connect(mapStateToProps)(AdminRoute);
