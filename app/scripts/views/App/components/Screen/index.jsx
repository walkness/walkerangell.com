import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


const Screen = ({ url, children, color }) => (
  <div styleName='screen'>

    <div styleName='top-bar'><div styleName='url'>{url}</div></div>

    <div styleName='viewport'>
      { children }
      <div
        styleName='overlay'
        style={{ backgroundColor: `rgb(${color.join(', ')})` }}
      />
    </div>

    <div
      styleName='overlay'
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
