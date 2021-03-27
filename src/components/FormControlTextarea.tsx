import styled from "styled-components";

const FormControlTextarea = styled.textarea`
  min-height: 80px;
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-weight: 400;
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--border);
  appearance: none;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:disabled,
  &[readonly] {
    background-color: var(--disabled-control);
  }

  &:focus {
    border-color: var(--active-control);
    outline: 0;
    box-shadow: 0 0 0 3px rgb(13 110 253 / 25%);
  }
`;

export default FormControlTextarea;
