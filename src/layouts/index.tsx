/* globals document window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { PageProps } from 'gatsby';

import Header from '@/components/header';
import Footer from '@/components/footer';
import BackgroundImage from '@/components/background_image';

import '../styles/main.scss';
import styles from './index.module.scss';

declare global {
  /* eslint-disable no-var, vars-on-top */
  var Typekit: unknown;
  var onTypekitLoaded: () => void;
  /* eslint-enable no-var, vars-on-top */
}

interface State {
  typekitLoaded: boolean;
}

interface ChildContext {
  typekitLoaded: boolean;
}

class App extends Component<PageProps, State> {
  static childContextTypes = {
    typekitLoaded: PropTypes.bool,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      typekitLoaded: typeof window !== 'undefined' && !!window.Typekit,
    };
  }

  getChildContext(): ChildContext {
    const { typekitLoaded } = this.state;
    return { typekitLoaded };
  }

  componentDidMount(): void {
    window.onTypekitLoaded = this.handleTypekitLoaded.bind(this);
    if ('mixBlendMode' in document.body.style) {
      document.documentElement.className += ' can-blend';
    } else {
      document.documentElement.className += ' no-blend';
    }
  }

  handleTypekitLoaded(): void {
    this.setState({ typekitLoaded: true });
  }

  render(): React.ReactNode {
    const { children, path } = this.props;
    const isHome = path === '/';
    return (
      <div id='app' className={cx(styles.app, { home: isHome })}>

        <Helmet
          defaultTitle='Walker Angell'
          titleTemplate='%s | Walker Angell'
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
        >
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#ffffff' />
        </Helmet>

        <Header />

        <main className='site-main'>

          <CSSTransitionGroup
            transitionName='sidebar'
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          />

          <div id='main-content' className={styles.mainContent}>

            { children }

          </div>

        </main>

        <Footer />

        <CSSTransitionGroup
          transitionName='fadeIn'
          transitionEnterTimeout={500}
          transitionLeave={false}
        >
          { isHome && <BackgroundImage key='bg-img' /> }
        </CSSTransitionGroup>

      </div>
    );
  }
}

export default App;
