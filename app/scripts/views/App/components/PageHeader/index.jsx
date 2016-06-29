import React, { PropTypes } from 'react';

const PageHeader = ({ title, children }) => (
  <div className='page-header'>
    <h1>{ title }</h1>
    { children }
  </div>
)

PageHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageHeader
