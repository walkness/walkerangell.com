import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { locationShape } from 'react-router/lib/PropTypes';

import LazyImg from 'AppComponents/LazyImg';
import CaptureLinks from 'AppComponents/CaptureLinks';

import { photography } from 'data';
import content from 'data/content/photography/index.md';

import './styles.scss';


const Galleries = ({ location, params }) => {
  const isGallery = params && params.category && true;
  const title = isGallery ? photography.portfolio.categories[params.category].title : photography.portfolio.title; // eslint-disable-line max-len
  const galleries = isGallery ? photography.portfolio.categories[params.category].galleries : photography.portfolio.categories; // eslint-disable-line max-len

  return (
    <div styleName='galleries'>

      <Helmet title={title} />

      { !isGallery ?
        <CaptureLinks
          styleName='copy'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      : null }

      <ul styleName='galleries'>

        { Object.keys(galleries).map((slug) => {
          const gallery = galleries[slug];
          const src350 = require(`images/${photography.portfolio.images[gallery.featured].filename}-350x350.jpg`); // eslint-disable-line import/no-dynamic-require, global-require, max-len
          const src700 = require(`images/${photography.portfolio.images[gallery.featured].filename}-700x700.jpg`); // eslint-disable-line import/no-dynamic-require, global-require, max-len
          return (
            <li key={slug}>
              <Link to={`${location.pathname}${slug}/`}>
                <LazyImg src={src350} srcSet={`${src350} 1x, ${src700} 2x`} />
                <span styleName='name'>{gallery.title}</span>
              </Link>
            </li>
          );
        }) }

      </ul>

    </div>
  );
};

Galleries.propTypes = {
  location: locationShape.isRequired,
  params: PropTypes.object.isRequired,
};

export default Galleries;
