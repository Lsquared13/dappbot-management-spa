import * as React from 'react';

export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export const ModalStyles = {
  backdrop: 'backdrop',
  header : 'header',
  body: 'body',
  dialog: 'dialog',
  footer: 'footer',
  title: 'title',
  content: 'content'
}
export interface ModalDialogProps {
  /**
    * string, custom class prefix for css
    * @default modal-dialog
    **/
  customClass?: string
}

class ModalDialog extends React.Component<ModalDialogProps> {

  static defaultProps = {
    customClass: 'modal-dialog'
  }
  
  render() {
    const { children, customClass } = this.props;
    let className = prefix(customClass, ModalStyles.dialog);
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default ModalDialog
