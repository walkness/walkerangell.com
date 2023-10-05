import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';
import { useMatch } from '@reach/router';

interface Props extends GatsbyLinkProps<{ userScroll: boolean; }> {
  to: string;
  liClassName?: ClassValue;
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

  const active = useMatch(to);

  return (
    <li
      className={cx(
        'nav-item',
        liClassName,
        { active },
      )}
    >

      { noLinkActive ? children : <Link className={cx('nav-link', { active })} {...rest} /> }

      { dropdown }

    </li>
  );
};

export default NavLink;
