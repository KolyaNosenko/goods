export interface NewItem {
  title: string;
  description: string;
  price: string;
  image: string;
  discount: string;
  discountExpireAt: number;
}

export interface UpdateItem extends NewItem {
  id: string;
}
