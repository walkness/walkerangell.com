import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import NavLink from '@/components/nav_link';

import styles from './sidebar.module.scss';

const query = graphql`
  query {
    categories: allPortfolioCategoriesJson {
      nodes {
        slug
        title
      }
    }
    galleries: allPortfolioGalleriesJson {
      nodes {
        category
        slug
        title
      }
    }
  }
`;

interface Gallery {
  category: string;
  slug: string;
  title: string;
}

interface Data {
  categories: {
    nodes: {
      slug: string;
      title: string;
    }[];
  };
  galleries: {
    nodes: Gallery[];
  };
}

interface GalleriesByCategory {
  [category: string]: Gallery[];
}

const Sidebar: React.FC = () => {
  const data: Data = useStaticQuery(query);
  const { categories: { nodes: categories }, galleries: { nodes: galleries } } = data;
  const galleriesByCategory = galleries.reduce((acc, gallery) => {
    if (!acc[gallery.category]) acc[gallery.category] = [];
    acc[gallery.category].push(gallery);
    return acc;
  }, {} as GalleriesByCategory);
  return (
    <aside className={styles.sidebar}>

      <nav id='photo-nav' className={`${styles.photoNav} collapsed`}>
        <ul className={styles.menu}>
          { categories.map((category) => {
            const categoryPath = `/photography/${category.slug}/`;
            const catGalleries = galleriesByCategory[category.slug];
            const subMenu = (
              <ul className='sub-menu'>
                { catGalleries.map((gallery) => (
                  <NavLink
                    key={gallery.slug}
                    to={`${categoryPath}${gallery.slug}/`}
                    partiallyActive
                   >
                    {gallery.title}
                  </NavLink>
                )) }
              </ul>
            );
            return (
              <NavLink
                key={category.slug}
                liClassName='menu-item menu-item-has-children'
                to={categoryPath}
                dropdown={subMenu}
              >
                {category.title}
              </NavLink>
            );
          })}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;
