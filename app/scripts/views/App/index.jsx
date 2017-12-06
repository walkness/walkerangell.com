/* globals document window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Helmet from 'react-helmet';

import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';

import './styles.scss';


class App extends Component {

  static propTypes = {
    main: PropTypes.node,
    sidebar: PropTypes.node,
  };

  static childContextTypes = {
    typekitLoaded: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      typekitLoaded: typeof window !== 'undefined' && window.Typekit,
    };
  }

  getChildContext() {
    return {
      typekitLoaded: this.state.typekitLoaded,
    };
  }

  componentDidMount() {
    window.typekitLoaded = this.typekitLoaded.bind(this);
    if ('mixBlendMode' in document.body.style) {
      document.documentElement.className += ' can-blend';
    } else {
      document.documentElement.className += ' no-blend';
    }
  }

  typekitLoaded() {
    this.setState({ typekitLoaded: true });
  }

  render() {
    const routeName = this.props.main.props.route.name;
    return (
      <div id='app' className={routeName} styleName='app'>

        <Helmet
          htmlAttributes={{ lang: 'en' }}
          defaultTitle='Walker Angell'
          titleTemplate='%s | Walker Angell'
          meta={[
            { charset: 'utf-8' },
            { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'theme-color', content: '#ffffff' },
          ]}
          /* eslint-disable global-require, max-len */
          link={[
            { rel: 'apple-touch-icon', sizes: '180x180', href: require('../../../images/favicon/apple-touch-icon.png') },
            { rel: 'icon', type: 'image/png', href: require('../../../images/favicon/favicon-32x32.png'), sizes: '32x32' },
            { rel: 'icon', type: 'image/png', href: require('../../../images/favicon/favicon-16x16.png'), sizes: '16x16' },
            { rel: 'manifest', href: require('../../../images/favicon/manifest.json') },
            { rel: 'mask-icon', href: require('../../../images/favicon/safari-pinned-tab.svg'), color: '#5bbad5' },
          ]}
          /* eslint-enable global-require, max-len */
          script={[
            {
              type: 'text/javascript',
              innerHTML: 'document.getElementsByTagName("html")[0].className+=" js"',
            },
            {
              src: '//use.typekit.net/ioi4abv.js',
              type: 'text/javascript',
              async: true,
              onLoad: 'try{Typekit.load({async:true, active: window.typekitLoaded || function(){}});}catch(e){}', // eslint-disable-line max-len
            },
            {
              type: 'text/javascript',
              innerHTML: 'try{Typekit.load({async:true});}catch(e){}',
            },
          ]}
        />

        <Header />

        <main className='site-main'>

          <CSSTransitionGroup
            transitionName='sidebar'
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            { this.props.sidebar }
          </CSSTransitionGroup>

          <div id='main-content' styleName='main-content'>

            { this.props.main }

          </div>

        </main>

        <Footer />

        <CSSTransitionGroup
          transitionName='fadeIn'
          transitionEnterTimeout={500}
          transitionLeave={false}
        >
          { routeName === 'home' ?
            <BackgroundImage key='bg-img' image='Iceland-5497' />
          : null }
        </CSSTransitionGroup>

      </div>
    );
  }

}

export default App;
