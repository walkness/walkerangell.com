import React from 'react';
import { social } from '../../../../../../data';


const SocialLinks = ({}) => {
  return (
    <ul className='social-links'>
      { Object.keys(social).map(slug => {
        const item = social[slug];
        return (
          <li key={slug} className={`social-link ${slug}`}>
            <a href={item.link} target='_blank' title={item.title}>
              {item.title}
            </a>
          </li>
        )
      }) }
    </ul>
  );
}

export default SocialLinks;
