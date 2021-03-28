import { useContext } from "react";
import styled from "styled-components";
import ItemForm from "src/components/ItemForm";
import { NotificationContext } from "src/context/NotificationContext";
import { InvalidData } from "src/errors";
import { NewItem as NewItemType } from "src/types";

const NewItemContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface Props {
  addItem: (item: NewItemType) => Promise<void>;
}

const NewItem = (props: Props) => {
  const notify = useContext(NotificationContext);

  const onFormSubmit = async (item: NewItemType) => {
    try {
      await props.addItem(item);
      notify.success("New item successfully added");
    } catch (error) {
      console.error("Failed to add new item", error);
      // TODO handle diff errors
      if (error instanceof InvalidData) {
        notify.error("Invalid data");
      } else {
        notify.error("Failed to add new item");
      }
    }
  };

  return (
    <NewItemContainer>
      <ItemForm headerTitle="New item" onSubmit={onFormSubmit} />
    </NewItemContainer>
  );
};

export default NewItem;
