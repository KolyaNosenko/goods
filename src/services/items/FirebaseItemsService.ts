import { getDifferenceBetweenObjects, objectUrlToBlob } from "src/utils";
import { validateItem } from "./helpers";
import { InvalidData } from "src/errors";
import firebase from "firebase/app";
import { ItemDTO, NewItemDTO, UpdateItemDTO } from "./types";
import { ItemsService } from "./ItemsService";

export class FirebaseItemsService implements ItemsService {
  private firebaseApp: firebase.app.App;
  private updateItemListeners: Array<(item: ItemDTO) => void>;
  private addItemListeners: Array<(item: ItemDTO) => void>;
  private removeItemListeners: Array<(id: string) => void>;

  constructor(firebaseApp: firebase.app.App) {
    this.firebaseApp = firebaseApp;
    this.addItemListeners = [];
    this.removeItemListeners = [];
    this.updateItemListeners = [];
    this.firebaseApp
      .database()
      .ref("items")
      .on("child_added", this.notifyAddItemListeners.bind(this));
    this.firebaseApp
      .database()
      .ref("items")
      .on("child_changed", this.notifyUpdateItemListeners.bind(this));
    this.firebaseApp
      .database()
      .ref("items")
      .on("child_removed", this.notifyRemoveItemListeners.bind(this));
  }

  onItemAdded(callback: (item: ItemDTO) => void) {
    this.addItemListeners.push(callback);
  }

  onItemUpdated(callback: (item: ItemDTO) => void) {
    this.updateItemListeners.push(callback);
  }

  onItemRemoved(callback: (id: string) => void) {
    this.removeItemListeners.push(callback);
  }

  private notifyAddItemListeners(snapshotData: firebase.database.DataSnapshot) {
    if (!snapshotData || !snapshotData.val()) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    // TODO add item
    const item = snapshotData.val() as ItemDTO;
    this.addItemListeners.forEach((listener) => {
      listener(item);
    });
  }

  private notifyUpdateItemListeners(
    snapshotData: firebase.database.DataSnapshot
  ) {
    if (!snapshotData || !snapshotData.val()) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    const item = snapshotData.val();
    this.updateItemListeners.forEach((listener) => {
      listener(item);
    });
  }

  private notifyRemoveItemListeners(
    snapshotData: firebase.database.DataSnapshot
  ) {
    if (!snapshotData || !snapshotData.val() || !snapshotData.val().id) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    const itemId = snapshotData.val().id;
    this.removeItemListeners.forEach((listener) => {
      listener(itemId);
    });
  }

  async addItem(item: NewItemDTO): Promise<ItemDTO> {
    // TODO add more custom error
    // TODO add custom id realization
    if (!this.isNewItemValid(item)) throw new InvalidData("Invalid data");

    const ref = this.firebaseApp.database().ref("items").push();
    const itemId = ref.key;
    // TODO check this
    if (!itemId) throw Error("Failed to add item");

    const imgFile = await objectUrlToBlob(item.image);
    const imgUrl = await this.uploadImage("images/" + itemId, imgFile);

    const finalItem: ItemDTO = {
      ...item,
      id: itemId,
      image: imgUrl,
      updatedAt: Date.now(),
    };
    await ref.set(finalItem);
    return finalItem;
  }

  async getItems(): Promise<Array<ItemDTO>> {
    const snapshot = await this.firebaseApp.database().ref("items").get();
    if (!snapshot.val()) return [];
    return Object.values(snapshot.val());
  }

  private async uploadImage(
    path: string,
    imgFile: Blob | Uint8Array | ArrayBuffer
  ) {
    const imageRef = await this.firebaseApp.storage().ref().child(path);
    await imageRef.put(imgFile);
    return imageRef.getDownloadURL();
  }

  private async removeFile(path: string): Promise<void> {
    return this.firebaseApp.storage().ref().child(path).delete();
  }

  async removeItem(itemId: string) {
    await this.firebaseApp.database().ref("items").child(itemId).remove();
    try {
      await this.removeFile("images/" + itemId);
    } catch (error) {
      console.warn("Failed to remove item image", error);
    }
  }

  async getItem(itemId: string): Promise<ItemDTO> {
    const snapshot = await this.firebaseApp
      .database()
      .ref("items")
      .child(itemId)
      .get();
    return snapshot.val();
  }

  async updateItem(updatedItem: UpdateItemDTO): Promise<ItemDTO> {
    if (!this.isNewItemValid(updatedItem) || !updatedItem.id)
      throw new InvalidData("Invalid data");

    const existingItem = await this.getItem(updatedItem.id);
    // TODO add clear type
    const diff = getDifferenceBetweenObjects(
      updatedItem,
      existingItem
    ) as ItemDTO;

    if (!Object.keys(diff).length) return existingItem;

    if (diff.image) {
      // TODO think about exception and transaction
      diff.image = await this.updateItemImage(updatedItem);
    }

    const updates = { ...diff, updatedAt: Date.now() };

    await this.firebaseApp
      .database()
      .ref("items")
      .child(updatedItem.id)
      .update(updates);

    return {
      ...existingItem,
      ...updates,
    };
  }

  private async updateItemImage({ id, image }: { id: string; image: string }) {
    await this.removeFile("images/" + id);
    const imgFile = await objectUrlToBlob(image);
    return await this.uploadImage("images/" + id, imgFile);
  }
  // TODO change this
  isNewItemValid(item: NewItemDTO) {
    return validateItem(item);
  }
}
