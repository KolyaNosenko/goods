import { useContext } from "react";
import {
  HomeContainer,
  HomeList,
  HomeListItem,
  HomeToolbar,
  HomeToolbarAction,
  HomeToolbarActionsWrapper,
  HomeToolbarAddIcon,
  HomeToolbarButton,
} from "./styled";
import ItemCard from "../../components/ItemCard";
// TODO move to context
import { NotificationContext } from "../../context/NotificationContext";
import { Item } from "../../store";

export interface Props {
  // TODO move to separate type
  items: Array<Item>;
  isAdmin?: boolean;
  removeItem: (id: string) => Promise<void>;
  editItem: (id: string) => void;
  addItem: () => void;
}

const Home = ({
  items = [],
  removeItem,
  editItem,
  addItem,
  isAdmin,
}: Props) => {
  const { notify } = useContext(NotificationContext);
  const onRemove = async (id: string) => {
    // TODO add errors handling
    try {
      await removeItem(id);
      notify.success("Deleted successfully");
    } catch (error) {
      console.error("Failed to delete", error);
      notify.error("Failed to delete");
    }
  };

  const onEdit = (id: string) => {
    // TODO pass only id
    editItem(id);
  };

  return (
    <HomeContainer>
      {isAdmin && (
        <HomeToolbar>
          <HomeToolbarActionsWrapper>
            <HomeToolbarAction>
              <HomeToolbarButton
                startIcon={<HomeToolbarAddIcon />}
                onClick={addItem}
              >
                Add
              </HomeToolbarButton>
            </HomeToolbarAction>
          </HomeToolbarActionsWrapper>
        </HomeToolbar>
      )}
      <HomeList>
        {items.map((item) => (
          <HomeListItem key={item.id}>
            <ItemCard
              {...item}
              isActionsVisible={isAdmin}
              onEdit={() => onEdit(item.id)}
              onRemove={() => onRemove(item.id)}
            />
          </HomeListItem>
        ))}
      </HomeList>
    </HomeContainer>
  );
};

export default Home;
