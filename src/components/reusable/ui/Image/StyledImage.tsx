import styled, { StyledComponentClass } from "styled-components";
// export { StyledComponentClass };

const StyledImage: StyledComponentClass<
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
  &.img {
    display: block;
    width: calc(12 / var(--ncols) * 100%);
    position: absolute;
  }

  &.img[alt] {
    color: transparent;
  }

  @media (inverted-colors) {
    &.scaled-img {
      filter: invert(100%);
    }
  }
`;

const StyledImageDiv: StyledComponentClass<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  any,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = styled.div`
  &.scaled-img {
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }

  &.contain {
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    background-size: contain;
  }

  &.cover {
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    background-size: cover;
  }

  @media (inverted-colors) {
    &.scaled-img {
      filter: invert(100%);
    }
  }
`;

export { StyledImage as default, StyledImageDiv };
