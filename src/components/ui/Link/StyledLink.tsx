import styled, { StyledComponentClass } from "styled-components";

const StyledLink: StyledComponentClass<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  any,
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = styled.a`
  &.link {
    text-decoration: none;
    color: inherit; /* Links should have the correct underline color */
    outline: none;
    cursor: pointer;
  }

  &.link:hover,
  &.link:focus {
    /* text-decoration: underline; */
  }

  &.accessibleFocusStyle:focus {
    /* box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5); */
    outline: 0;
  }

  &.block {
    display: block;
  }
`;

export default StyledLink;
