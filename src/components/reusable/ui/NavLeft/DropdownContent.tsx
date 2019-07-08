import * as React from 'react';
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export const DropdownStyles = {
  trigger: 'trigger',
  item : 'item',
  content: 'content'
}

export interface DropdownContentProps {
  /**
    * string, custom class prefix for css
    * @default dropdown-content
    **/
  customClass?: string
}

export const DropdownContent: React.SFC<DropdownContentProps> = (props) => {
  const { children, customClass } = props;

  let className = prefix(customClass, DropdownStyles.content);

  const boundChildren = React.Children.map(children, (child: any) => {
    return React.cloneElement(child, {
      customClass: customClass
    })
  })

  return (
    <div className={className}>
      <ul>
        {boundChildren}
      </ul>
    </div>
  );
}

export default DropdownContent;
