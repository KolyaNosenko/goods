import styled from "styled-components";

export interface Props {
  size?: string;
  borderSize?: string;
}

const Spinner = styled.span.attrs<Props>((props) => ({
  size: props.size || "22px",
  borderSize: props.borderSize || "3px",
}))<Props>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  position: relative;
  display: inline-block;
  border: ${(props) => props.borderSize} solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
