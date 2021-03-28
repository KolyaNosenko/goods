import {
  HeaderContainer,
  HeaderLoginIcon,
  HeaderLogo,
  HeaderLogoutIcon,
  HeaderProfile,
  HeaderProfileIcon,
  HeaderProfileName,
} from "./styled";
import { SecondaryButton } from "../Button";

export interface Props {
  user: {
    isAuthenticated: boolean;
    email: string;
  };
  loginUser: () => void;
  logoutUser: () => Promise<void>;
}

const Header = ({ loginUser, logoutUser, user }: Props) => {
  // TODO handle async errors
  const { isAuthenticated, email } = user;

  return (
    <HeaderContainer>
      {isAuthenticated ? (
        <>
          <HeaderProfile to="/">
            <HeaderProfileIcon />
            <HeaderProfileName>{email}</HeaderProfileName>
          </HeaderProfile>
          <SecondaryButton
            startIcon={<HeaderLogoutIcon />}
            onClick={logoutUser}
          >
            Logout
          </SecondaryButton>
        </>
      ) : (
        <>
          <HeaderProfile to="/">
            <HeaderLogo />
          </HeaderProfile>
          <SecondaryButton startIcon={<HeaderLoginIcon />} onClick={loginUser}>
            Login
          </SecondaryButton>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;
