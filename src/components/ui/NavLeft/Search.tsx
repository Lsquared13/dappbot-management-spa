import * as React from 'react';
import classnames from 'classnames';
export const SearchClasses = {
  searchIcon: 'icon-search',
  closeIcon: 'icon-close'
}
import './Search.css';

export interface Props {
  /**
   * func, Event --> called when search bar's search icon is clicked
   **/
  onSearch?: () => void;
  /**
   * func, Event --> called when search bar's clear icon is clicked
   **/
  onClear?: () => void;
  /**
   * func, Event --> called when search bar's input changes
   **/
  onChange?: (event: any, value: any) => void;
  /**
   * string, search placeholder
   * @default Search text
   **/
  placeholder?: string;
  /**
   * boolean, Disables search bar
   * @default false
   **/
  disabled?: boolean;
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   *  <Search inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef?: () => void;
  /**
   * string, custom class prefix for css
   * @default search
   **/
  customClass?: string;
  /**
     * string, class to apply on component
     **/
  className?: string;
}

export interface State {
  searchText: ''
}

const noop = () => { };

export class Search extends React.Component<Props, State> {

  static defaultProps = {
    placeholder: 'Search text',
    customClass: 'search'
  }

  constructor(props: any) {
    super(props);

    this.state = {
      searchText: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }


  onSearchChange(e: any) {
    this.setState({
      searchText: e.target.value
    });
    if (typeof this.props.onChange === 'function')
      this.props.onChange(e, e.target.value);
  }

  onClearClick(e: any) {
    this.setState({
      searchText: ''
    });
    if (typeof this.props.onClear === 'function')
      this.props.onClear();
    if (typeof this.props.onChange === 'function')
      this.props.onChange(e, e.target.value);
  }

  getClasses(props: Props) {
    const { customClass, className } = props;
    return classnames(customClass, className);
  }

  render() {
    const { placeholder, onSearch, inputRef } = this.props;
    const classes = this.getClasses(this.props);
    return (
      <div className={classes}>
        <input type="search"
          placeholder={placeholder}
          ref={inputRef ? inputRef : noop}
          onChange={this.onSearchChange}
          value={this.state.searchText}
        />
        <span className={SearchClasses.searchIcon} onClick={onSearch}></span>
        {this.state.searchText && <span className={SearchClasses.closeIcon} onClick={this.onClearClick}></span>}
      </div>
    )
  }
}

export default Search;
