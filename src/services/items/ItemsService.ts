import { getDifferenceBetweenObjects, objectUrlToBlob } from "../../utils";
import { validateItem } from "./helpers";
import { InvalidData } from "../../errors";
import firebase from "firebase/app";
import { Item, NewItem, UpdateItem } from "./types";

export class ItemsService {
  private firebaseApp: firebase.app.App;
  private updateItemListeners: Array<(item: Item) => void>;
  private addItemListeners: Array<(item: Item) => void>;
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

  onItemAdded(callback: (item: Item) => void) {
    this.addItemListeners.push(callback);
  }

  onItemUpdated(callback: (item: Item) => void) {
    this.updateItemListeners.push(callback);
  }

  onItemRemoved(callback: (id: string) => void) {
    this.removeItemListeners.push(callback);
  }

  notifyAddItemListeners(snapshotData: firebase.database.DataSnapshot) {
    if (!snapshotData || !snapshotData.val()) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    // TODO add item
    const item = snapshotData.val() as Item;
    this.addItemListeners.forEach((listener) => {
      listener(item);
    });
  }

  notifyUpdateItemListeners(snapshotData: firebase.database.DataSnapshot) {
    if (!snapshotData || !snapshotData.val()) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    const item = snapshotData.val();
    this.updateItemListeners.forEach((listener) => {
      listener(item);
    });
  }

  notifyRemoveItemListeners(snapshotData: firebase.database.DataSnapshot) {
    if (!snapshotData || !snapshotData.val() || !snapshotData.val().id) {
      console.warn("Unknown snapshotData structure");
      return;
    }
    const itemId = snapshotData.val().id;
    this.removeItemListeners.forEach((listener) => {
      listener(itemId);
    });
  }

  async addItem(item: NewItem): Promise<Item> {
    const isValid = await this.isNewItemValid(item);
    // TODO add more custom error

    // TODO add custom id realization
    if (!isValid) throw new InvalidData("Invalid data");

    const ref = this.firebaseApp.database().ref("items").push();
    const itemId = ref.key;
    // TODO check this
    if (!itemId) throw Error("Failed to add item");

    const imgFile = await objectUrlToBlob(item.image);
    const imgUrl = await this.uploadImage("images/" + itemId, imgFile);

    const finalItem: Item = {
      ...item,
      id: itemId,
      image: imgUrl,
      updatedAt: Date.now(),
    };
    await ref.set(finalItem);
    return finalItem;
  }

  async getItems(): Promise<Array<Item>> {
    const snapshot = await this.firebaseApp.database().ref("items").get();
    if (!snapshot.val()) return [];
    return Object.values(snapshot.val());
  }

  async uploadImage(path: string, imgFile: Blob | Uint8Array | ArrayBuffer) {
    const imageRef = await this.firebaseApp.storage().ref().child(path);
    await imageRef.put(imgFile);
    return imageRef.getDownloadURL();
  }

  async removeFile(path: string): Promise<void> {
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

  async getItem(itemId: string): Promise<Item> {
    const snapshot = await this.firebaseApp
      .database()
      .ref("items")
      .child(itemId)
      .get();
    return snapshot.val();
  }

  async updateItem(updatedItem: UpdateItem) {
    const isValid = await this.isNewItemValid(updatedItem);

    if (!isValid) throw new InvalidData("Invalid data");

    const existingItem = await this.getItem(updatedItem.id);
    // TODO add clear type
    const diff = getDifferenceBetweenObjects(updatedItem, existingItem) as Item;

    if (!Object.keys(diff).length) return updatedItem;

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

  async updateItemImage({ id, image }: { id: string; image: string }) {
    await this.removeFile("images/" + id);
    const imgFile = await objectUrlToBlob(image);
    return await this.uploadImage("images/" + id, imgFile);
  }
  // TODO change this
  async isNewItemValid(item: any) {
    const errors = await validateItem(item);
    return Object.values(errors).length === 0;
  }
}
