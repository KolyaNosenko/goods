import { ItemDTO, NewItemDTO, UpdateItemDTO } from "./types";

export interface ItemsService {
  onItemAdded(callback: (item: ItemDTO) => void): void;
  onItemUpdated(callback: (item: ItemDTO) => void): void;
  onItemRemoved(callback: (id: string) => void): void;
  addItem(item: NewItemDTO): Promise<ItemDTO>;
  getItems(): Promise<Array<ItemDTO>>;
  removeItem(itemId: string): Promise<void>;
  getItem(itemId: string): Promise<ItemDTO>;
  updateItem(updatedItem: UpdateItemDTO): Promise<ItemDTO>;
  isNewItemValid(item: any): boolean;
}
