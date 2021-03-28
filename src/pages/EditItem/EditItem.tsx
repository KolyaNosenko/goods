import { useContext } from "react";
import styled from "styled-components";
import ItemForm from "src/components/ItemForm";
import { NotificationContext } from "src/context/NotificationContext";
import { InvalidData } from "src/errors";
import { Item } from "src/store/items";
import { NewItem, UpdateItem } from "src/types";

const EditItemContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface Props {
  // TODO move to type
  item: Item;
  editItem: (item: UpdateItem) => Promise<void>;
}

const EditItem = ({ editItem, item }: Props) => {
  const notify = useContext(NotificationContext);
  // TODO change this
  const onSubmit = async (editedItem: NewItem) => {
    try {
      await editItem({
        ...editedItem,
        id: item.id,
      });
      notify.success("Item successfully edited");
    } catch (error) {
      console.error("Failed to edit", error);
      // TODO handle diff errors
      if (error instanceof InvalidData) {
        notify.error("Invalid data");
      } else {
        notify.error("Failed to edit");
      }
    }
  };

  return (
    <EditItemContainer>
      <ItemForm
        headerTitle="Edit item"
        onSubmit={onSubmit}
        title={item.title}
        image={item.image}
        price={item.price}
        description={item.description}
        discountExpireAt={item.discountExpireAt}
        discount={item.discount}
      />
    </EditItemContainer>
  );
};

export default EditItem;
