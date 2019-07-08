import styled, { StyledComponentClass } from "styled-components";

export const StyledAvatar: StyledComponentClass<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  any,
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = styled.img`
  /** base class **/
  &.avatar {
    border-radius: 50%;
  }

  /** extra small **/
  &.avatar.xsm {
    width: 18px;
    height: 18px;
  }

  /** small **/
  &.avatar.sm {
    width: 24px;
    height: 24px;
  }

  /** medium **/
  &.avatar.md {
    width: 32px;
    height: 32px;
  }

  /** large **/
  &.avatar.lg {
    width: 80px;
    height: 80px;
  }

  /** extra large **/
  &.avatar.xlg {
    width: 64px;
    height: 64px;
  }
`;

export default StyledAvatar;
