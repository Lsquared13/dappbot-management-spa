import * as React from 'react';
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export const DropdownStyles = {
  trigger: 'trigger',
  item : 'item',
  content: 'content'
}
export interface DropdownTriggerProps {
  onClick?: () => void;
  /**
    * string, custom class prefix for css
    * @default dropdown-trigger
    **/
  customClass?: string
}

export const DropdownTrigger: React.SFC<DropdownTriggerProps> = (props) => {
  const { children, customClass, onClick } = props;
  const className = prefix(customClass, DropdownStyles.trigger)
  return (
    <a className={className} onClick={onClick}>
      {children}<i className="caret"></i>
    </a>
  );
}

export default DropdownTrigger;
