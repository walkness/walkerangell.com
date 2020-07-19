/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allPortfolioCategoriesJson {
        nodes {
          slug
        }
      }
      allPortfolioGalleriesJson {
        nodes {
          category
          slug
        }
      }
    }
  `);

  result.data.allPortfolioCategoriesJson.nodes.forEach(({ slug }) => {
    createPage({
      path: `/photography/${slug}/`,
      component: path.resolve('./src/templates/portfolio_category.tsx'),
      context: {
        category: slug,
      },
    });
  });

  result.data.allPortfolioGalleriesJson.nodes.forEach(({ category, slug }) => {
    createPage({
      path: `/photography/${category}/${slug}/`,
      component: path.resolve('./src/templates/portfolio_gallery.tsx'),
      context: {
        category,
        gallery: slug,
        imagesDir: `portfolio/${slug}`,
      },
    });
  });
};
