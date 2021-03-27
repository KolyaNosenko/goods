import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import EditItem from "./EditItem";
import { doUpdateItem, getItem } from "../../store";
import { StoreDispatch, StoreState } from "../../store/types";
import { UpdateItem } from "../../services/items";

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<{ id: string }>
) => {
  const itemId = props.match.params.id;
  return {
    item: getItem(state, itemId),
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    editItem: async (item: UpdateItem) => dispatch(doUpdateItem(item)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditItem)
);
