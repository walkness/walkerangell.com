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

        <meta charSet='utf-8'/>
        <meta http-equiv='x-ua-compatible' content='ie=edge'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>

        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        { css.map(filename => {
          return <link type='text/css' rel='stylesheet' href={publicPath + filename}/>
        }) }

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
