import React, { PropTypes } from 'react';
import data from '../../../../../../data';


const Footer = ({}) => {
  return (
    <footer id='colophon' className='site-footer' role='contentinfo'>

      <div id='supplementary'>

        <div id='footer-content' className='footer-content widget-area' role='complementary'>
          All site content and images copyright &copy;{ new Date().getFullYear() } by Walker Angell.
        </div>

      </div>

    </footer>
  )
}

export default Footer;
