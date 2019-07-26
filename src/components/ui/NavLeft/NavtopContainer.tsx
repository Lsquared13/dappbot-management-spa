import * as React from 'react';
import { NavTop } from "./NavTop";
import { Search } from './Search';
import { Dropdown, DropdownTrigger, DropdownContent } from './Dropdown';
import { Typography } from './Typography';
import { Icon } from './Icon';
import {Button} from './Button'
// @ts-ignore Will be present upon component generation
import Identicon from "identicon.js";


export interface Props {
  toggleLogin: ()=>void
  address: string;
}

export interface State {
  data: string;
}


export class NavTopContainer extends React.Component<Props, State> {
  
  static defaultProps = {
  }

  constructor(props: any) {
    super(props);

    this.state = {
      data: this.props.address
        ? new Identicon(this.props.address).toString()
        : new Identicon("d3b07384d113edec49eaa6238ad5ff00").toString()
    };
  }

  componentWillReceiveProps() {
    if (this.props.address) {
      this.setState({
        data: this.props.address && new Identicon(this.props.address).toString()
      });
    }
  }

  render() {
    return (
      <NavTop>
        <div className="top-navbar-inner">
          <ul>
            <li>
              <Dropdown>
                <DropdownTrigger>
                  <img
                    src={"data:image/png;base64," + this.state.data}
                    style={{ height: 34, borderRadius: "50%", width: 34 }}
                  />
                </DropdownTrigger>
                <DropdownContent>
                  <ul>
                    <li>
                    <a onClick={this.props.toggleLogin} > Login</a>
                    </li>
                    <li>
                      <a href="/favorites">Sign Up</a>
                    </li>

                    <li>
                      <a href="/logout">Support</a>
                    </li>
                  </ul>
                </DropdownContent>
              </Dropdown>
            </li>
          </ul>
        </div>
      </NavTop>
    )
  }
}

export default Search;


