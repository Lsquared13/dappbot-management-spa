import * as React from 'react';
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export const DropdownStyles = {
  trigger: 'trigger',
  item : 'item',
  content: 'content'
}

export interface DropdownItemProps {
  /**
    * string, link to navigate on item click
    * @default #
    **/
  link?: string
  /**
    * string, custom class prefix for css
    * @default dropdown-item
    **/
  customClass?: string
}

export const DropdownItem: React.SFC<DropdownItemProps> = (props) => {
  const { children, customClass, link } = props;

  let className = prefix(customClass, DropdownStyles.item);

  return (
    <li className={className} >
      {link ? <a href={link ? link : ''}>{children}</a> : <span>{children}</span>}
    </li >
  );
}

DropdownItem.defaultProps = {
  link: '#'
}

export default DropdownItem;
