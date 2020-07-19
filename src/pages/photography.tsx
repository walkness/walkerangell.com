import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Galleries from '@/components/galleries';

interface Props extends PageProps {
  data: {
    categories: {
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
    content: {
      childMarkdownRemark: {
        html: string;
      };
    };
    z
  };
}

const Photography: React.FC<Props> = ({ data, path }) => (
  <Galleries
    title='Photography'
    basePath={path}
    content={data.content.childMarkdownRemark.html}
    galleries={data.categories.nodes}
  />
);

export const pageQuery = graphql`
  query {
    categories: allPortfolioCategoriesJson {
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
    content: file(relativePath: {eq: "content/photography/index.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`;

export default Photography;
