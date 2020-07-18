import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';

import styles from './header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>

    <div className='container'>

      <nav>

        <Link to='/' className={cx('d-sm-none', styles.siteTitle)} activeClassName='active'>
          Walker Angell
        </Link>

        <Link to='/development/' activeClassName='active'>
          Development
        </Link>

        <Link to='/' className={cx('d-none d-sm-inline-block', styles.siteTitle)} activeClassName='active'>
          Walker Angell
        </Link>

        <Link to='/photography/' activeClassName='active'>
          Photography
        </Link>

      </nav>

    </div>

  </header>
);

export default Header;
