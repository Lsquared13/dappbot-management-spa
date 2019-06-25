import * as React from "react";
import classnames from "classnames";
import Text from "./../Text";
import { StyledTabs, StyledTab } from "./StyledTabs";

type eventData = {
  event: React.SyntheticEvent<HTMLAnchorElement>;
  activeTabIndex: number;
};

export interface TabProps {
  /**
   * number, active tab index
   **/
  activeTabIndex: number;
  /**
   * Array, { text: React.ReactNode; href: string;} tabs
   **/
  tabs: Array<{
    content: React.ReactNode;
    href: string;
  }>;
  /**
   * function, ({ event: SyntheticEvent<HTMLAnchorElement>, activeTabIndex: number }) => void
   * Event is fired when tab is cliked
   **/
  onChange: ({ event, activeTabIndex }: eventData) => void;
  /**
   * boolean, By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines,
   * from top to bottom.
   **/
  wrap?: boolean;
  hoverClass?: string;
  focusClass?: string;
}

export interface TabState {
  focusedTabIndex?: number;
  hoveredTabIndex?: number;
}

export class Tabs extends React.Component<TabProps, TabState> {
  state: TabState = {
    focusedTabIndex: undefined,
    hoveredTabIndex: undefined
  };

  handleTabClick = (i: number, e: React.SyntheticEvent<HTMLAnchorElement>) => {
    const { onChange } = this.props;
    onChange({ activeTabIndex: i, event: e });
  };

  handleTabFocus = (i: number) => this.setState({ focusedTabIndex: i });

  handleTabBlur = () => this.setState({ focusedTabIndex: undefined });

  handleTabMouseEnter = (i: number) => this.setState({ hoveredTabIndex: i });

  handleTabMouseLeave = () => this.setState({ hoveredTabIndex: undefined });

  render() {
    const {
      tabs,
      activeTabIndex,
      wrap,
      hoverClass = "hovered",
      focusClass = "focused"
    } = this.props;
    const { focusedTabIndex, hoveredTabIndex } = this.state;
    return (
      <StyledTabs
        className={classnames("Tabs", { flexWrap: wrap })}
        role="tablist"
      >
        {tabs.map(({ content, href }, i) => {
          const isActive = i === activeTabIndex;
          const isHovered = i === hoveredTabIndex;
          const isFocused = i === focusedTabIndex;
          const cs = classnames("tab", {
            tabIsNotActive: !isActive,
            tabIsActive: isActive,
            [hoverClass]: isHovered,
            [focusClass]: isFocused
          });

          return (
            <StyledTab
              aria-selected={isActive}
              className={cs}
              href={href}
              key={`${i}${href}`}
              onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) =>
                this.handleTabClick(i, e)
              }
              onFocus={() => this.handleTabFocus(i)}
              onBlur={this.handleTabBlur}
              onMouseEnter={() => this.handleTabMouseEnter(i)}
              onMouseLeave={this.handleTabMouseLeave}
              role="tab"
            >
              {content}
            </StyledTab>
          );
        })}
      </StyledTabs>
    );
  }
}

export default Tabs;
