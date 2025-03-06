import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import styles from './header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className='container'>
      <nav>
        <Link
          href='/'
          className={cx('d-sm-none', styles.siteTitle)}
          // activeClassName='active'
        >
          Walker Angell
        </Link>

        <Link
          href='/development/'
          // activeClassName='active'
          // partiallyActive
        >
          Development
        </Link>

        <Link
          href='/'
          className={cx('d-none d-sm-inline-block', styles.siteTitle)}
          // activeClassName='active'
        >
          Walker Angell
        </Link>

        <Link
          href='/photography/'
          // activeClassName='active'
          // partiallyActive
        >
          Photography
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
