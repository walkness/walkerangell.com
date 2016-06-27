import React, { PropTypes } from 'react';
import data from '../../../../../../data';


const Footer = ({}) => {
  return (
    <footer>
      <div className='container'>
        <em>{data.name} serves clients throughout Long Island, New York City and Westchester County.</em>
      </div>
    </footer>
  )
}

export default Footer;
