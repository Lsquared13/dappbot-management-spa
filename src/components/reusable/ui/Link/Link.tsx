import * as React from "react";
import classnames from "classnames";
import StyledLink from "./StyledLink";

export interface LinkProps {
  /**
   * React.ReactNode, React node as childeren
   **/
  children?: React.ReactNode;
  /**
   * string, href
   **/
  href: string;
  /**
   * boolean, display property inline/block
   * @default false
   **/
  inline?: boolean;
  /**
   * function, Event is fired when link is clicked
   **/
  onClick?: ({
    event
  }: {
    event: React.SyntheticEvent<HTMLAnchorElement>;
  }) => void;
  /**
   * string, target property of link "self" | "blank" | null
   * @default null
   **/
  target?: null | "self" | "blank";
}

export interface LinkStates {
  enableFocusStyles: boolean;
}

const TAB_KEY_CODE = 9;

export class Link extends React.Component<LinkProps, LinkStates> {
  static defaultProps = {};

  state: LinkStates = {
    enableFocusStyles: true
  };

  handleClick = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    const { href, onClick } = this.props;
    if (onClick && href) {
      onClick({ event });
    }
  };

  handleMouseDown = () => {
    const { href, target } = this.props;
    if (target === "blank" && href) {
      this.setState({ enableFocusStyles: false });
    }
  };

  handleKeyUp = (event: React.KeyboardEvent) => {
    const { href, target } = this.props;
    if (target === "blank" && event.keyCode === TAB_KEY_CODE && href) {
      this.setState({ enableFocusStyles: true });
    }
  };

  render() {
    const { children, inline = false, target = undefined, href } = this.props;
    const rel = target === "blank" ? "noopener noreferrer" : undefined;
    const linkTarget = target ? `_${target}` : undefined;

    return (
      <StyledLink
        className={classnames(
          "link",
          { accessibleFocusStyle: this.state.enableFocusStyles },
          { block: !inline }
        )}
        href={href}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleClick}
        rel={rel}
        target={linkTarget}
      >
        {children}
      </StyledLink>
    );
  }
}

export default Link;
