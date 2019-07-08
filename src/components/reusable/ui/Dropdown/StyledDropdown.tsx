import styled, { StyledComponentClass } from "styled-components";

export const StyledDropdownContent: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  position: absolute;
  float: left;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 110px;
  margin: 5px 0 0;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #b7bec6;
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(44, 55, 72, 0.15);
  box-shadow: 0 6px 12px rgba(44, 55, 72, 0.15);

  /* &:before {
    position: absolute;
    top: -7px;
    left: 9px;
    display: inline-block;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #b7bec6;
    border-left: 7px solid transparent;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    content: "";
  }

  &:after {
    position: absolute;
    top: -6px;
    left: 10px;
    display: inline-block;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
    border-left: 6px solid transparent;
    content: "";
  } */

  & ul {
    margin: 0;
    padding: 5px 0;
  }
`;

export const StyledDropdownTrigger: StyledComponentClass<
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
  font-family: "Inter UI";
  display: flex;
  position: relative;
  align-items: center;
  font-size: 14px;
  color: #2b333f;
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    color: #2b333f;
  }
  &.active {
    /* border-bottom: 2px solid #0064ff;
    color: #0064ff; */
  }
  &.disabled {
    cursor: not-allowed;
    color: #cacaca;
  }
`;

export const StyledDropdownItem: StyledComponentClass<
  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  any,
  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = styled.li`
  list-style: none;
  display: block;
  position: relative;

  & a {
    display: block;
    font-family: "Inter UI";
    padding: 10px 12px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857143;
    color: #2b333f;
    white-space: nowrap;
    font-size: 14px;
    text-decoration: none;

    &:focus,
    &:hover {
      color: #2b333f;
      background-color: #f0f2f4;
      outline: none;
    }
  }
`;
