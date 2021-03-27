import { connect } from "react-redux";
import { doAddItem } from "src/store";
import NewItem from "./NewItem";
// TODO fix this
import { NewItem as NewItemType } from "src/services/items";
import { StoreDispatch } from "src/store/types";

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    addItem: async (item: NewItemType) => dispatch(doAddItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(NewItem);
