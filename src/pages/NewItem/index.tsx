import { connect } from "react-redux";
import { doAddItem } from "src/store";
import NewItem from "./NewItem";
// TODO fix this
import { NewItemDTO } from "src/services/items";
import { StoreDispatch } from "src/store";

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    addItem: async (item: NewItemDTO) => dispatch(doAddItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(NewItem);
