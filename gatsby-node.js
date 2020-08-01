/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs');

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

const readJsonFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return reject(err);

    try {
      return resolve(JSON.parse(data));
    } catch (e) {
      return reject(e);
    }
  });
});

exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type !== 'File') return;

  const sortFile = path.resolve(node.dir, 'order.json');

  try {
    const data = await readJsonFile(sortFile);

    const idx = data.indexOf(node.name);

    createNodeField({ node, name: 'order', value: idx === -1 ? null : idx });
  } catch (e) {
    // Ignore
  }
};
