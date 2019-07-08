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
export interface ModalTitleProps {
  /**
    * string, custom class prefix for css
    * @default modal-title
    **/
  customClass?: string
}

class ModalTitle extends React.Component<ModalTitleProps> {

  static defaultProps = {
    customClass: 'modal-title'
  }

  render() {
    const { children, customClass } = this.props;
    let className = prefix(customClass, ModalStyles.title);
    return (
      <h6 className={className}>
        {children}
      </h6>
    );
  }
}

export default ModalTitle;
