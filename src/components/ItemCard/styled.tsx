import styled from "styled-components";
import { ReactComponent as RemoveIcon } from "../../assets/icons/remove.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { PrimaryButton } from "../Button";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  padding: 15px;
  overflow: hidden;
  border-radius: 5px;
  height: 385px;
`;

export const CardPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-family: "Roboto Medium", sans-serif;
  margin-bottom: 10px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  margin-bottom: 10px;
  flex-grow: 1;
  overflow: hidden;
`;

export const CardPrice = styled.span`
  font-family: "Roboto Medium", sans-serif;
`;

export const CardOldPrice = styled(CardPrice)`
  text-decoration: line-through;
`;

export const CardNewPrice = styled(CardPrice)`
  color: var(--danger);
`;

export const CardImage = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const CardImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  height: 165px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const CardDiscountWrapper = styled.div`
  margin-bottom: 10px;
`;

export const CardDiscount = styled.span`
  font-size: 13px;
  border-radius: 5px;
  padding: 3px 6px;
  color: var(--text-secondary);
  background-color: var(--danger);
`;

export const CardDiscountExpire = styled.span`
  display: block;
  font-size: 13px;
  color: var(--secondary-dark);
  margin-top: 5px;
`;

export const CardActionsWrapper = styled.ul`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 5px 10px;
  border-radius: 5px;
  right: 10px;
  top: 10px;
  //background-color: var(--primary);
`;

export const CardAction = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export const CardActionButton = styled(PrimaryButton)`
  padding: 5px 10px;
`;

export const CardRemoveIcon = styled(RemoveIcon)`
  width: 14px;
  height: 14px;
  fill: var(--text-secondary);
`;

export const CardEditIcon = styled(EditIcon)`
  width: 14px;
  height: 14px;
  fill: var(--text-secondary);
`;
