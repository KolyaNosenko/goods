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

export interface NewItemDTO {
  title: string;
  description: string;
  price: number;
  image: string;
  discount: number;
  discountExpireAt: number;
}

export interface UpdateItemDTO extends NewItemDTO {
  id: string;
}
