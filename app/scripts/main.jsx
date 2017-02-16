/* globals window document */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, createMemoryHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import Helmet from 'react-helmet';
import ga from 'react-ga';

import '../styles/main.scss';

import Html from './views/Html';
import routes from './config/routes';


if (typeof document !== 'undefined') {
  ga.initialize('UA-63799547-1');

  const logPageView = () => {
    ga.pageview(window.location.pathname);
  };

  const shouldScroll = (prevRouterProps, nextRouterProps) => {
    if (
      nextRouterProps.location.pathname === '/development/' && (
        nextRouterProps.location.hash ||
        (nextRouterProps.location.state && nextRouterProps.location.state.userScroll)
      )
    ) {
      return false;
    }

    if (
      prevRouterProps &&
      nextRouterProps.location.pathname === prevRouterProps.location.pathname &&
      nextRouterProps.location.hash !== prevRouterProps.location.hash
    ) {
      return false;
    }

    if (
      prevRouterProps &&
      nextRouterProps.params.category &&
      nextRouterProps.params.gallery &&
      prevRouterProps.params.category &&
      prevRouterProps.params.gallery
    ) {
      return false;
    }

    return true;
  };

  ReactDOM.render(
    <Router
      history={browserHistory}
      onUpdate={logPageView}
      render={applyRouterMiddleware(useScroll(shouldScroll))}
    >
      { routes() }
    </Router>,
    document.getElementById('root')
  );
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
    <Html reactApp={reactApp} assets={assets} publicPath={publicPath} head={head} />
  );
  callback(null, `<!DOCTYPE html>${html}`);
};
