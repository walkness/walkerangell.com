import React from 'react';
import Link, { LinkProps } from 'next/link';
import cx, { Argument } from 'classnames';

interface Props extends LinkProps {
  to: string;
  liClassName?: Argument;
  noLinkActive?: boolean;
  dropdown?: React.ReactNode;
}

const NavLink: React.FC<Props> = ({
  liClassName = null,
  noLinkActive = false,
  dropdown = null,
  ref, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...rest
}) => {
  const { children, to } = rest;

  const active = false;

  return (
    <li className={cx('nav-item', liClassName, { active })}>
      {noLinkActive ? (
        children
      ) : (
        <Link className={cx('nav-link', { active })} {...rest} />
      )}

      {dropdown}
    </li>
  );
};

export default NavLink;
