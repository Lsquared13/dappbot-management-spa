import * as React from "react";

import Box from "./../Box";
import StyledImage, { StyledImageDiv } from "./StyledImage";

const shouldScaleImage = (fit: string) => fit === "cover" || fit === "contain";

export interface ImageProps {
  /**
   * function, Event is fired when error occurs while loading image
   **/
  onError?: () => void;
  /**
   * function, Event is fired when image is loaded successfuly
   **/
  onLoad?: () => void;
  /**
   * string, alt name for image
   **/
  alt: string;
  /**
   * React.ReactNode, React node as childeren
   **/
  children?: React.ReactNode;
  /**
   * string, The color you pass into Image will be used to fill the placeholder that shows up as an image loads.
   **/
  color?: string;
  /**
   * string, how to fit image into its container (Doesn't work with srcSet or sizes.)
   * @default "none"
   **/
  fit?: "contain" | "cover" | "none";
  /**
   * number, Exact height of source image
   **/
  naturalHeight: number;
  /**
   * number, Exact width of source image
   **/
  naturalWidth: number;
  /**
   * string, A list of one or more strings separated by commas indicating a set of source sizes
   **/
  sizes?: string;
  /**
   * string, src property
   **/
  src: string;
  /**
   * string, A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use.
   **/
  srcSet?: string;
}

export default class Image extends React.PureComponent<ImageProps> {
  static defaultProps = {
    color: "transparent",
    fit: "none"
  };

  componentDidMount() {
    const { fit = "none" } = this.props;
    if (shouldScaleImage(fit)) {
      this.loadImage();
    }
  }

  componentDidUpdate(prevProps: ImageProps) {
    const { fit = "none", src } = this.props;
    if (shouldScaleImage(fit) && prevProps.src !== src) {
      this.loadImage();
    }
  }

  handleLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  handleError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
  };

  loadImage() {
    if (typeof window !== "undefined") {
      const image = new (window as any).Image();
      image.onload = this.handleLoad;
      image.onerror = this.handleError;
      image.src = this.props.src;
    }
  }

  render() {
    const {
      alt,
      color = "transparent",
      children,
      fit = "none",
      naturalHeight,
      naturalWidth,
      sizes,
      src,
      srcSet
    } = this.props;

    const isScaledImage = shouldScaleImage(fit);

    const childContent = children ? (
      <Box position="absolute" top left bottom right overflow="hidden">
        {children}
      </Box>
    ) : null;

    return isScaledImage ? (
      <StyledImageDiv
        aria-label={alt}
        className={fit}
        style={{
          backgroundColor: color,
          backgroundImage: `url('${src}')`
        }}
        role="img"
      >
        {childContent}
      </StyledImageDiv>
    ) : (
      <Box
        position="relative"
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: color,
            paddingBottom: `${(naturalHeight / naturalWidth) * 100}%`
          }
        }}
      >
        <StyledImage
          alt={alt}
          className="img"
          onError={this.handleError}
          onLoad={this.handleLoad}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
        />
        {childContent}
      </Box>
    );
  }
}
