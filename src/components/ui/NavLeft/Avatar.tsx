import * as React from 'react';
import classnames from 'classnames';
import './Avatar.css';

export function prefix(baseClass: any, style: string) {
  return baseClass + (style ? "-" + style : "");
}
export const AvatarStyles = {
  default: 'default',
  custom: 'custom',
  badge: 'badge'
}
export interface Props {
  /**
   * string, Use src prop to display custom avatar image
   **/
  src?: string;
  /**
   * boolean, show badge | string - show badge value
   **/
  badge?: boolean | string
  /**
   * string, custom class prefix for css
   * @default avatar
   **/
  customClass?: string;
  /**
   * string, class to apply on component
   **/
  className?: string;
}

const getClasses = (props: any) => {
  let { customClass, src, badge, className } = props;
  let styles = {};
  if (!src)
    styles[(prefix(customClass, AvatarStyles.default))] = true;
  else
    styles[(prefix(customClass, AvatarStyles.custom))] = true;
  if (badge)
    styles[(prefix(customClass, AvatarStyles.badge))] = true;
  return classnames(customClass, styles, className);
}

export const Avatar: React.SFC<Props> = (props) => {
  let { src, badge } = props;
  let className = getClasses(props);
  let badgeContent = (<span><i className="icon icon-blockmaker"></i></span>);

  return (
    <div className={className}>
      <img src="./images.jpeg" />
      {badgeContent}
    </div>
  )
}

Avatar.defaultProps = {
  customClass: 'avatar'
}

export default Avatar;
