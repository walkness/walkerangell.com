import React from 'react';

import './styles.scss';


const Footer = () => (
  <footer id='colophon' className='site-footer' styleName='footer' role='contentinfo'>

    <div id='supplementary'>

      <div id='footer-content' className='footer-content widget-area' role='complementary'>
        All site content and images copyright &copy;{ new Date().getFullYear() } by Walker Angell.
      </div>

    </div>

  </footer>
);

export default Footer;
