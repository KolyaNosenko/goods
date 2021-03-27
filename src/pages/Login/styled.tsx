import styled from "styled-components";
// TODO think about semantic
export const LoginContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 400px;
  height: 450px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FormHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid var(--border);
  flex-grow: 0;
  flex-shrink: 0;
`;

export const FormBody = styled.div`
  padding: 40px 30px 30px 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const FormSubmitWrapper = styled.div`
  margin-top: auto;
  text-align: center;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-family: "Roboto Medium", sans-serif;
`;
