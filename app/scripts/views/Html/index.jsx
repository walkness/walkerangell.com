/* eslint-disable jsx-a11y/html-has-lang */

import React from 'react';
import PropTypes from 'prop-types';


const Html = ({ reactApp, head, publicPath, assets }) => {
  const css = assets.filter(filename => filename.endsWith('.css'));
  const js = assets.filter(filename => filename.endsWith('.js'));
  return (
    <html {...head.htmlAttributes.toComponent()}>

      <head>

        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {head.style.toComponent()}

        { css.map(filename => (
          <link type='text/css' rel='stylesheet' href={publicPath + filename} />
        )) }

        {head.script.toComponent()}

      </head>

      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: reactApp }} />

        { js.map(filename => (
          <script defer type='text/javascript' src={publicPath + filename} />
        )) }

      </body>

    </html>
  );
};

Html.propTypes = {
  reactApp: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
  head: PropTypes.object.isRequired,
  publicPath: PropTypes.string.isRequired,
};

export default Html;
