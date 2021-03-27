import { connect } from "react-redux";
import { doAddItem } from "../../store";
import NewItem from "./NewItem";
// TODO fix this
import { NewItem as NewItemType } from "../../services/items";
import { StoreDispatch } from "../../store/types";

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    addItem: async (item: NewItemType) => dispatch(doAddItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(NewItem);
