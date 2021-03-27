import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Home from "./Home";
import {
  doRemoveItem,
  getSortedItems,
  isUserAdmin,
  StoreDispatch,
  StoreState,
} from "src/store";

const mapStateToProps = (state: StoreState) => ({
  items: getSortedItems(state),
  isAdmin: isUserAdmin(state),
});

const mapDispatchToProps = (
  dispatch: StoreDispatch,
  props: RouteComponentProps
) => {
  return {
    removeItem: async (itemId: string) => dispatch(doRemoveItem(itemId)),
    editItem: (id: string) => props.history.push(`edit/${id}`),
    addItem: () => props.history.push("/new"),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
