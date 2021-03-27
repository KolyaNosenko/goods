import styled from "styled-components";
// TODO think about code duplication
export const Form = styled.form`
  width: 600px;
  max-width: 95vw;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FormBody = styled.div`
  padding: 40px 30px 30px 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const FormHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid var(--border);
  flex-grow: 0;
  flex-shrink: 0;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-family: "Roboto Medium", sans-serif;
`;

export const FormSubmitWrapper = styled.div`
  text-align: center;
  margin-top: auto;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;

export const FormCol = styled.div`
  flex: 1 0 0;
  width: 100%;
  max-width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

export const FormImageWrapper = styled.div`
  height: 120px;
  max-width: 100%;
  text-align: center;
`;

export const FormImage = styled.img`
  width: auto;
  max-height: 100%;
`;
