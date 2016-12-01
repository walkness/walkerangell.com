import React from 'react';
import { social } from '../../../../../../data';


const SocialLinks = () => (
  <ul className='social-links'>
    { Object.keys(social).map(slug => {
      const item = social[slug];
      return (
        <li key={slug} className={`social-link ${slug}`}>
          <a href={item.link} target='_blank' title={item.title} rel='noopener noreferrer'>
            {item.title}
          </a>
        </li>
      );
    }) }
  </ul>
);

export default SocialLinks;
