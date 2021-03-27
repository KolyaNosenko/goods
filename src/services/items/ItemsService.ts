import { ItemDTO, NewItem, UpdateItem } from "./types";

export interface ItemsService {
  onItemAdded(callback: (item: ItemDTO) => void): void;
  onItemUpdated(callback: (item: ItemDTO) => void): void;
  onItemRemoved(callback: (id: string) => void): void;
  addItem(item: NewItem): Promise<ItemDTO>;
  getItems(): Promise<Array<ItemDTO>>;
  removeItem(itemId: string): Promise<void>;
  getItem(itemId: string): Promise<ItemDTO>;
  updateItem(updatedItem: UpdateItem): Promise<ItemDTO>;
  isNewItemValid(item: any): Promise<boolean>;
}
