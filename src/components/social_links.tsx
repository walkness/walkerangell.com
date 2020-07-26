import React from 'react';
import { social } from '@/data';

import styles from './social_links.module.scss';

const SocialLinks: React.FC = () => (
  <ul className={`social-links ${styles.socialLinks}`}>
    { Object.keys(social).map((slug) => {
      const item = social[slug as keyof typeof social];
      return (
        <li key={slug} className={`social-link ${slug} ${styles.socialLink}`}>
          <a href={item.link} target='_blank' title={item.title} rel='noopener noreferrer'>
            {item.title}
          </a>
        </li>
      );
    }) }
  </ul>
);

export default SocialLinks;
