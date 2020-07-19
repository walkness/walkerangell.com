import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';
import { useMatch } from '@reach/router';

interface DefaultProps {
  liClassName: ClassValue;
  noLinkActive: boolean;
  dropdown: React.ReactNode;
}

interface RequiredProps extends GatsbyLinkProps<unknown>, Partial<DefaultProps> {
  to: string;
}

type Props = RequiredProps & DefaultProps

const NavLink: React.FC<Props> = ({
  liClassName,
  noLinkActive,
  dropdown,
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

NavLink.defaultProps = {
  liClassName: null,
  noLinkActive: false,
  dropdown: null,
};

export default NavLink;
