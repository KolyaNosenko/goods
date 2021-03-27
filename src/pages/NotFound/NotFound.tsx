import styled from "styled-components";
import { ReactComponent as OopsIcon } from "../../assets/icons/oops.svg";

const NotFoundContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const NotFoundIcon = styled(OopsIcon)`
  width: 80px;
  height: 80px;
`;

const NotFoundTitle = styled.h1`
  font-family: "Roboto Medium", sans-serif;
  font-size: 28px;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundIcon />
      <NotFoundTitle>Oops. Page not found.</NotFoundTitle>
    </NotFoundContainer>
  );
};

export default NotFound;
