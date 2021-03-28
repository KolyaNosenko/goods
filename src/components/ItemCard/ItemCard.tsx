import {
  CardAction,
  CardActionButton,
  CardActionsWrapper,
  CardContainer,
  CardDescription,
  CardDiscount,
  CardDiscountExpire,
  CardDiscountWrapper,
  CardEditIcon,
  CardImage,
  CardImageWrapper,
  CardNewPrice,
  CardOldPrice,
  CardPrice,
  CardPriceWrapper,
  CardRemoveIcon,
  CardTitle,
} from "./styled";
import { formatDate } from "src/utils";
import { Item } from "src/store";

export interface Props extends Item {
  onEdit: () => void;
  onRemove: () => void;
  isActionsVisible?: boolean;
}

// TODO add some pending logic during removing
const ItemCard = ({
  title,
  image,
  description,
  price,
  newPrice,
  discount,
  // TODO think about this
  discountExpireAt = 0,
  onEdit,
  onRemove,
  isActionsVisible,
}: Props) => {
  const isDiscounted =
    discount && discountExpireAt && discountExpireAt > Date.now();

  return (
    // TODO image loading indicator
    <CardContainer>
      {isActionsVisible && (
        <CardActionsWrapper>
          <CardAction>
            <CardActionButton onClick={onRemove}>
              <CardRemoveIcon />
            </CardActionButton>
          </CardAction>
          <CardAction>
            <CardActionButton onClick={onEdit}>
              <CardEditIcon />
            </CardActionButton>
          </CardAction>
        </CardActionsWrapper>
      )}
      <CardImageWrapper>
        <CardImage src={image} alt="item-image" />
      </CardImageWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {isDiscounted ? (
        <>
          <CardDiscountWrapper>
            <CardDiscount>{discount}%</CardDiscount>
          </CardDiscountWrapper>
          <CardPriceWrapper>
            <CardOldPrice>{price}$</CardOldPrice>
            <CardNewPrice>{newPrice}$</CardNewPrice>
          </CardPriceWrapper>
          <CardDiscountExpire>
            Available until: {formatDate(discountExpireAt)}
          </CardDiscountExpire>
        </>
      ) : (
        <CardPriceWrapper>
          <CardPrice>{price}$</CardPrice>
        </CardPriceWrapper>
      )}
    </CardContainer>
  );
};

export default ItemCard;
