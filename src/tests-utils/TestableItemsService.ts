import {
  ItemDTO,
  ItemsService,
  NewItemDTO,
  UpdateItemDTO,
} from "src/services/items";
import { getItemDTO } from "./services";

export class TestableItemsService implements ItemsService {
  addItem(item: NewItemDTO): Promise<ItemDTO> {
    return Promise.resolve(getItemDTO(item));
  }
  getItem(itemId: string): Promise<ItemDTO> {
    return Promise.resolve(getItemDTO({ id: itemId }));
  }
  getItems(): Promise<Array<ItemDTO>> {
    return Promise.resolve([getItemDTO()]);
  }
  isNewItemValid(item: any): boolean {
    return true;
  }
  onItemAdded(callback: (item: ItemDTO) => void): void {}
  onItemRemoved(callback: (id: string) => void): void {}
  onItemUpdated(callback: (item: ItemDTO) => void): void {}
  removeItem(itemId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
  updateItem(updatedItem: UpdateItemDTO): Promise<ItemDTO> {
    return Promise.resolve(getItemDTO(updatedItem));
  }
}
