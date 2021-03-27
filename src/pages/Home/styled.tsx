import styled from "styled-components";
import { PrimaryButton } from "../../components/Button";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

export const HomeContainer = styled.div`
  flex-grow: 1;
  padding: 0 40px;
`;

export const HomeToolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const HomeToolbarActionsWrapper = styled.ul`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
`;

export const HomeToolbarAction = styled.li`
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
`;

export const HomeToolbarButton = styled(PrimaryButton)`
  text-transform: uppercase;
`;

export const HomeToolbarAddIcon = styled(AddIcon)`
  fill: #ffffff;
  width: 14px;
  height: 14px;
`;

export const HomeList = styled.ul`
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
  margin-left: -20px;
`;

export const HomeListItem = styled.li`
  flex-shrink: 0;
  flex-basis: calc(100% / 4);
  width: calc(100% / 4);
  max-width: calc(100% / 4);
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 20px;
`;
