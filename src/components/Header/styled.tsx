import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as ShopIcon } from "src/assets/icons/shop.svg";
import { ReactComponent as LoginIcon } from "src/assets/icons/login.svg";
import { ReactComponent as UserIcon } from "src/assets/icons/user.svg";
import { ReactComponent as LogoutIcon } from "src/assets/icons/logout.svg";

export const HeaderContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 70px;
  padding: 10px 30px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary);
`;

export const HeaderLogo = styled(ShopIcon)`
  width: 40px;
  height: 40px;
  fill: var(--text-secondary);
`;

export const HeaderLoginIcon = styled(LoginIcon)`
  width: 20px;
  height: 20px;
  fill: var(--text-secondary);
  margin-right: 5px;
`;

export const HeaderLogoutIcon = styled(LogoutIcon)`
  width: 20px;
  height: 20px;
  fill: var(--text-secondary);
  margin-right: 5px;
`;

export const HeaderProfile = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
`;

export const HeaderProfileIcon = styled(UserIcon)`
  width: 25px;
  height: 25px;
  fill: var(--text-secondary);
  margin-right: 10px;
`;

export const HeaderProfileName = styled.span`
  font-family: "Roboto Medium", sans-serif;
  font-size: 16px;
  color: var(--text-secondary);
`;
