import React from 'react';
import PropTypes from 'prop-types';


const Screen = ({ url, children, color }) => (
  <div className='screen'>

    <div className='top-bar'><div className='url'>{url}</div></div>

    <div className='viewport'>
      { children }
      <div
        className='overlay'
        style={{ backgroundColor: `rgb(${color.join(', ')})` }}
      />
    </div>

    <div
      className='overlay'
      style={{ backgroundColor: `rgb(${color.join(', ')})` }}
    />

  </div>
);

Screen.propTypes = {
  url: PropTypes.string,
  color: PropTypes.array,
  children: PropTypes.node,
};

Screen.defaultProps = {
  url: '',
  color: [0, 0, 0],
};

export default Screen;
