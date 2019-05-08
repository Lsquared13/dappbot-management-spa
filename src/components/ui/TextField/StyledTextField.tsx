import styled from "styled-components";
export const StyledTextField = styled.input`
  &.textField {
    width: 100%;
    border: 1px solid var(--color-control-border);
    border-radius: 4px;
    height: 3rem;
    padding: 0.75rem 1rem;
    font-weight: 300;
    background: var(--color-control-bg);
    color: var(--color-control-color);
    transition: border-color 120ms;
    margin-bottom: 1rem;
  }

  &.textField:focus {
    background-color: #fff;
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }

  &.textField::placeholder {
    color: #8e8e8e;
  }

  &.normal {
    border-color: #8e8e8e;
  }

  &.errored {
    border-color: #e3780c;
  }

  &.enabled {
    color: var(--darkGray);
    background-color: var(--white);
    cursor: text;
  }

  &.disabled {
    color: var(--darkGray);
    background-color: var(--lightGray);
  }
`;

export const StyledErrorMessage = styled.span`
  &.textField &.errorMsg {
    color: red;
    font-weight: 200 !important;
    font-size: 0.5rem !important;
  }

  &.hide {
    display: hidden;
  }
`
export default StyledTextField;
