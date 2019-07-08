import * as React from 'react';


export const ModalStyles = {
  backdrop: 'backdrop',
  header : 'header',
  body: 'body',
  dialog: 'dialog',
  footer: 'footer',
  title: 'title',
  content: 'content'
}
export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export interface ModalBodyProps {
  /**
    * string, custom class prefix for css
    * @default modal-body
    **/
  customClass?: string
}

class ModalBody extends React.Component<ModalBodyProps> {

  static defaultProps = {
    customClass: 'modal-body'
  }

  render() {
    const { children, customClass } = this.props;
    let className = prefix(customClass, ModalStyles.body);
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default ModalBody;
