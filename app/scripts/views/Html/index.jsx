import React, { PropTypes } from 'react';


const Html = ({reactApp, head, publicPath, assets}) => {
  
  const css = assets.filter(filename => {
    return filename.endsWith('.css');
  });

  const js = assets.filter(filename => {
    return filename.endsWith('.js');
  });

  return (
    <html {...head.htmlAttributes.toComponent()}>

      <head>

        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {head.style.toComponent()}

        { css.map(filename => {
          return <link type='text/css' rel='stylesheet' href={publicPath + filename}/>
        }) }

        {head.script.toComponent()}

      </head>

      <body>
        <div id='root' dangerouslySetInnerHTML={{__html: reactApp}}/>

        { js.map(filename => {
          return <script defer type='text/javascript' src={publicPath + filename}></script>
        }) }

      </body>

    </html>
  )
}

Html.propTypes = {
  reactApp: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
};

export default Html;
