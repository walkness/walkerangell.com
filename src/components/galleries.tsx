import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import CaptureLinks from '@/components/capture_links';
import LazyImg from '@/components/lazy_img';

import styles from './galleries.module.scss';

interface Gallery {
  title: string;
  slug: string;
  image: {
    childImageSharp: {
      fixed: {
        src: string;
        srcSet: string;
        width: number;
        height: number;
      };
    };
  };
}

interface Props {
  title?: string;
  content?: string;
  basePath: string;
  galleries: Gallery[];
}

const Galleries: React.FC<Props> = ({ title, content, galleries, basePath }) => (
  <div className={styles.galleries}>

    { title && <Helmet title={title} /> }

    { content && (
      <CaptureLinks
        className={styles.copy}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    ) }

    <ul className={styles.galleries}>

      { galleries.map((gallery) => {
        const { title: galleryTitle, slug, image } = gallery;
        const { fixed: img } = image.childImageSharp;
        return (
          <li key={slug}>
            <Link to={`${basePath}${slug}/`}>
              <LazyImg {...img} />
              <span className={styles.name}>{galleryTitle}</span>
            </Link>
          </li>
        );
      }) }

    </ul>

  </div>
);

export default Galleries;
