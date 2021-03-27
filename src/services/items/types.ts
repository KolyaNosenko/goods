export interface ItemDTO {
  description: string;
  discount?: number;
  discountExpireAt?: number;
  id: string;
  image: string;
  price: number;
  title: string;
  updatedAt: number;
}

export interface NewItem {
  id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  discount: number;
  discountExpireAt: number;
}

export interface UpdateItem extends NewItem {
  id: string;
}
