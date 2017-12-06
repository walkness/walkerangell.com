import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


const PageHeader = ({ title, children }) => (
  <div className='page-header' styleName='page-header'>
    <h1>{ title }</h1>
    { children }
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PageHeader.defaultProps = {
  children: null,
};

export default PageHeader;
