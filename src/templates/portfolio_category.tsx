import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Galleries from '@/components/galleries';

interface Props extends PageProps {
  data: {
    category: {
      slug: string;
      title: string;
    };
    galleries: {
      nodes: {
        slug: string;
        title: string;
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
      }[];
    };
  };
}

const Photography: React.FC<Props> = ({ data, path }) => (
  <Galleries
    title='Photography'
    basePath={path}
    galleries={data.galleries.nodes}
  />
);

export const pageQuery = graphql`
  query($category: String!) {
    category: portfolioCategoriesJson(slug: {eq: $category}) {
      slug
      title
    }
    galleries: allPortfolioGalleriesJson(filter: {category: {eq: $category}}) {
      nodes {
        slug
        title
        image {
          childImageSharp {
            fixed(width: 350, height: 350) {
              src
              srcSet
              width
              height
            }
          }
        }
      }
    }
  }
`;

export default Photography;
