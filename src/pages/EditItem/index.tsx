import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import EditItem from "./EditItem";
import { doUpdateItem, getItem, StoreDispatch, StoreState } from "src/store";
import { UpdateItemDTO } from "src/services/items";

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
    editItem: async (item: UpdateItemDTO) => dispatch(doUpdateItem(item)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditItem)
);
