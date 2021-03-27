import {
  HeaderContainer,
  HeaderLoginIcon,
  HeaderLogo,
  HeaderLogoutIcon,
  HeaderLogoWrapper,
  HeaderProfile,
  HeaderProfileIcon,
  HeaderProfileName,
} from "./styled";
import { SecondaryButton } from "../Button";

export interface Props {
  // TODO change this
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
          <HeaderProfile>
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
          <HeaderLogoWrapper>
            <HeaderLogo />
          </HeaderLogoWrapper>
          <SecondaryButton startIcon={<HeaderLoginIcon />} onClick={loginUser}>
            Login
          </SecondaryButton>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;
