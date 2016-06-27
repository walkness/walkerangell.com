import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, createMemoryHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import Helmet from 'react-helmet';
import ga from 'react-ga';
import 'bootstrap-loader';

import Html from './views/Html';
import routes from './config/routes';


if (typeof document !== 'undefined') {
  ga.initialize('UA-XXXXXXXX-X');

  const logPageView = () => {
    ga.pageview(window.location.pathname);
  };

  ReactDOM.render(
    <Router history={browserHistory} onUpdate={logPageView} render={applyRouterMiddleware(useScroll())}>
      { routes() }
    </Router>,
    document.getElementById('root'));
}

export default (locals, callback) => {
  const history = createMemoryHistory(locals.path);

  const publicPath = locals.webpackStats.compilation.outputOptions.publicPath;

  const assets = Object.keys(locals.webpackStats.compilation.assets);

  const reactApp = ReactDOMServer.renderToString(
    <Router history={history}>
      { routes() }
    </Router>);

  const head = Helmet.rewind();

  const html = ReactDOMServer.renderToStaticMarkup(
    <Html reactApp={reactApp} assets={assets} publicPath={publicPath} head={head}/>);
  callback(null, '<!DOCTYPE html>' + html);
}
