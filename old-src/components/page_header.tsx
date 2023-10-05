import React from 'react';
import PropTypes from 'prop-types';

import styles from './page_header.module.scss';

interface Props {
  title: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, children }) => (
  <div className={`page-header ${styles.pageHeader}`}>
    <h1>{ title }</h1>
    { children }
  </div>
);

export default PageHeader;
