import styled from "styled-components";

export const StyledTab = styled.span<{ selected: boolean, hide?:boolean }>`
  font-size: 14px;
  padding: 0 10px 15px 10px;
  color: ${props => (props.selected ? "#0064FF" : "#2B333F")};
  ${props =>
    props.selected
      ? "border-bottom: 2px solid #0064FF;"
      : "border-bottom: none;"};
    ${props =>
    props.hide
      ? "display: none"
      : ""};
`;

export default StyledTab;
