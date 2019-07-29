import * as React from "react";
import classnames from "classnames";
import Mask from "../Mask";
import Image from "../Image";
import Box, { BoxProps } from "../Box";
import Icon, { IconProps } from "../Icon";

const Square = (props: BoxProps) => (
  <Box {...props} position="relative">
    <Box
      dangerouslySetInlineStyle={{ __style: { paddingBottom: "100%" } }}
      position="relative"
    />
    <Box position="absolute" top left bottom right>
      {props.children}
    </Box>
  </Box>
);

const DefaultAvatar = ({ name }: { name: string }) => {
  const firstInitial = name ? [...name][0].toUpperCase() : "";
  return (
    <Square color="gray" shape="circle">
      {firstInitial && (
        <svg
          width="100%"
          viewBox="-50 -50 100 100"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{name}</title>
          <text
            fontSize="50px"
            fill="#fff"
            dominantBaseline="central"
            textAnchor="middle"
            className={classnames(
              "antialiased",
              "sansSerif",
              "leadingSmall",
              "fontWeightBold"
            )}
          >
            {firstInitial}
          </text>
        </svg>
      )}
    </Square>
  );
};

export type AvatarState = { isImageLoaded: boolean };

export type AvatarProps = {
  /**
   * string, icon
   **/
  icon?: IconProps["icon"];
  /**
   * string, icon background color
   **/
  iconBgColor?: BoxProps["color"];
  /**
   * string, icon color
   **/
  iconColor?: IconProps["color"];
  /**
   * string, avatar name
   **/
  name: string;
  /**
   * boolean, adds a white border around Avatar so it's visible when displayed on other images
   **/
  outline?: boolean;
  /**
   * string, size - "sm" | "md" | "lg"
   * sm: 24px, md: 40px, lg: 72px. If size is undefined, Avatar will fill 100% of the parent container width
   **/
  size?: "sm" | "md" | "lg";
  /**
   * string, src
   **/
  src?: string;
};

const sizes = {
  sm: 24,
  md: 40,
  lg: 72
};

export class Avatar extends React.PureComponent<AvatarProps, AvatarState> {
  static defaultProps = {
    iconColor: "white",
    iconBgColor: "blue" as BoxProps["color"]
  };

  state = {
    isImageLoaded: true
  };

  handleImageError = () => this.setState({ isImageLoaded: false });

  render() {
    const {
      name,
      outline,
      size,
      src,
      icon,
      iconBgColor = "blue" as BoxProps["color"],
      iconColor = "white" as IconProps["color"]
    } = this.props;
    const { isImageLoaded } = this.state;
    const width = size ? sizes[size] : "100%";
    const height = size ? sizes[size] : "";
    return (
      <Box
        position="relative"
        color="white"
        shape="circle"
        width={width}
        height={height}
        {...(outline
          ? {
              dangerouslySetInlineStyle: {
                __style: {
                  boxShadow: "0 0 0 2px #fff"
                }
              }
            }
          : {})}
      >
        {src && isImageLoaded ? (
          <Mask shape="circle" wash>
            <Image
              src={src}
              alt={name}
              color="#EFEFEF"
              naturalHeight={1}
              naturalWidth={1}
              onError={this.handleImageError}
            />
          </Mask>
        ) : (
          <DefaultAvatar name={name} />
        )}
        {icon && (
          <Box
            position="absolute"
            width="30%"
            height="30%"
            minWidth={8}
            minHeight={8}
            dangerouslySetInlineStyle={{
              __style: {
                bottom: "4%",
                right: "4%"
              }
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              shape="circle"
              color={iconBgColor}
              dangerouslySetInlineStyle={{
                __style: {
                  boxShadow: "0px 1px 8px rgba(43, 51, 63, 0.2)"
                }
              }}
            >
              <Icon accessibilityLabel="" color={iconColor} icon={icon} />
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

export default Avatar;
