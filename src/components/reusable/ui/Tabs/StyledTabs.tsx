import styled, { StyledComponentClass } from "styled-components";

export const StyledTabs: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  &.Tabs {
    display: flex;
    user-select: none;
  }
`;

export const StyledTab: StyledComponentClass<
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
  &.tab {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 8px 16px;
    text-decoration: none;
    height: 70px;
    border: 0;
    margin: 0;
    outline: 0;
  }

  &.tab:not(:first-of-type) {
    margin-left: 40px;
  }

  &.tab:focus,
  &.tab:active {
    /* position: relative;
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5); */
  }

  &.tabIsNotActive {
    color: #002257;
  }

  &.tab:focus,
  &.tab:hover {
    text-decoration: none;
  }

  &.tabIsNotActive:focus,
  &.tabIsNotActive:hover {
    color: #002257;
    border-bottom: 2px solid #0064ff;
  }

  &.tabIsActive {
    border-bottom: 4px solid #0064ff;
  }

  &.tabIsActive .icon {
    color: #0064ff;
  }
`;

export default StyledTabs;
