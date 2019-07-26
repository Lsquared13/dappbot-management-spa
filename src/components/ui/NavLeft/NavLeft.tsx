import * as React from "react";
import Nav from "./Nav";
import NavItem from "./NavItem";
import Typography from "./Typography";
import Input from "./Input";
import AddressSwitcher from "./AddressSwitcher";
const stringCompare = require("string-similarity");
const sortBy = require("lodash.sortby");
const keyBy = require("lodash.keyby");

export interface NavLeftMenuItem {
  /**
   * string, title
   **/
  title: string;
  /**
   * string, icon
   **/
  icon: IconOptions;
  /**
   * boolean, disabled
   **/
  disabled?: boolean;
  /**
   * boolean, selected
   **/
  selected?: boolean;
  /**
   * function, onClick event
   **/
  onClick?: () => void;
}

export interface Props {
  /**
   * string, show link with particular key selected
   **/
  menuItems: NavLeftMenuItem[];
  /**
   * string, title.
   **/
  title: string;
  children?: any;
  searchable?: boolean;
  show?: boolean;
  address: string;
  onLoginShow: () => void;
}
interface State {
  searchVal: string;
}
type IconOptions =
  | "add"
  | "blockmaker"
  | "chevronLeft"
  | "close"
  | "cycle"
  | "demotion"
  | "filter"
  | "governanceCycle"
  | "help"
  | "home"
  | "listView"
  | "media"
  | "members"
  | "more"
  | "node"
  | "notificationBell"
  | "promotion"
  | "remove"
  | "search"
  | "settings"
  | "upload"
  | "user"
  | "vote"
  | "arrowDown";

type auth = boolean;

function item(icon: IconOptions, text: string) {
  return (
    <span>
      <i className={`icon icon-${icon}`} /> {text}{" "}
    </span>
  );
}
export default class NavLeft extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
    if (props.address != "") {
      this.state = {
        searchVal: ""
      };
    } else {
      this.state = {
        searchVal: ""
      };
    }

    this.getFilteredFxns = this.getFilteredFxns.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(evt: any) {
    this.setState({ searchVal: evt.currentTarget.value });
  }

  getFilteredFxns(): NavLeftMenuItem[] {
    let items: NavLeftMenuItem[];
    if (this.state.searchVal === "") {
      items = sortBy(this.props.menuItems, (item: NavLeftMenuItem) =>
        item.title.toLowerCase()
      );
    } else {
      const itemNames = this.props.menuItems.map(item => item.title);

      // Creates an object where keys are fxn names and values are normalized match percentages. Check lib docs for more info.
      const similiarityRatings = keyBy(
        stringCompare.findBestMatch(this.state.searchVal, itemNames).ratings,
        "target"
      );

      // Only show at least Golden Ratio similarity, sort by similarity
      items = sortBy(
        this.props.menuItems.filter((item: NavLeftMenuItem) => {
          return (
            this.state.searchVal.length < 4 ||
            similiarityRatings[item.title].rating > 0.1
          );
        }),
        (item: NavLeftMenuItem) => {
          return 1 - similiarityRatings[item.title].rating;
        }
      );
    }
    return items;
  }

  render() {
    let addresses: any;
    if (this.props.address == "") {
      addresses = [
        {
          title: "0x",
          label: "Not Authenticated"
        }
      ];
    } else {
      addresses = [
        {
          title: this.props.address,
          label: "Authenticated"
        }
      ];
    }
    let selectedKey;
    this.props.menuItems.filter((item: NavLeftMenuItem, index: number) => {
      return item.selected && (selectedKey = index);
    });
    let searchBar = (
      <Input
        type="text"
        value={this.state.searchVal}
        onChange={this.updateSearch}
        placeholder="Search"
      />
    );
    const items = this.getFilteredFxns();
    const navItems = items.map((menuItem, index) => {
      return (
        <NavItem
          key={index}
          disabled={menuItem.disabled}
          onClick={menuItem.onClick}
        >
          {item(menuItem.icon, menuItem.title)}
        </NavItem>
      );
    });
    return (
      <div
        className="left-sidebar"
        style={
          this.props.show
            ? {
                display: "block",
                height: "100%",
                overflow: "scroll",
                position: "relative"
              }
            : {}
        }
      >
        <div className="left-sidebar-body">
          <Typography h6>{this.props.title}</Typography>
          {this.props.searchable ? searchBar : null}
          <Nav
            selectedKey={selectedKey}
            onSelect={(event: any, key: any) => console.log(event, key)}
          >
            {navItems}
          </Nav>
        </div>
        <div className="left-sidebar-footer">
          <AddressSwitcher
            onLoginShow={this.props.onLoginShow}
            title="Signing txs as"
            address={this.props.address}
            onSelect={(index: any, data: any) => {
              console.log(index, data);
            }}
          />
        </div>
      </div>
    );
  }
}
