import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const ButtonRoot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  padding: 8px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.65;
  }
`;

const ButtonLabel = styled.span`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const ButtonStartIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
}

const Button = React.forwardRef((props: Props, ref) => {
  const { startIcon, children, ...otherProps } = props;

  const startIconComponent = startIcon && (
    <ButtonStartIconWrapper>{startIcon}</ButtonStartIconWrapper>
  );

  return (
    <ButtonRoot {...otherProps} ref={ref as any}>
      <ButtonLabel>
        {startIconComponent}
        {children}
      </ButtonLabel>
    </ButtonRoot>
  );
});

export const SecondaryButton = styled(Button)`
  color: var(--text-secondary);
  background-color: var(--secondary);
  border-color: var(--secondary);

  &:hover {
    background-color: var(--secondary-dark);
    border-color: var(--secondary-dark);
  }
`;

export const PrimaryButton = styled(Button)`
  color: var(--text-secondary);
  background-color: var(--primary);
  border: 1px solid var(--primary);

  &:hover {
    background-color: var(--primary-dark);
    border-color: var(--primary-dark);
  }
`;
