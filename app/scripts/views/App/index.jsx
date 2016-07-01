import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { routerShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';

import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundImage from './components/BackgroundImage';


class App extends Component {

  static childContextTypes = {
    typekitLoaded: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      typekitLoaded: window.Typekit && true,
    };
  }

  getChildContext() {
    return {
      typekitLoaded: this.state.typekitLoaded,
    };
  }

  componentDidMount() {
    window.typekitLoaded = this.typekitLoaded.bind(this);
  }

  typekitLoaded() {
    this.setState({typekitLoaded: true});
  }

  render() {
    const routeName = this.props.main.props.route.name;
    return (
      <div id='app' className={routeName}>

        <Helmet
          htmlAttributes={{'lang': 'en'}}
          defaultTitle='Walker Angell'
          titleTemplate='%s | Walker Angell'
          meta={[
            {charset: 'utf-8'},
            {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
          ]}
          script={[
            {type: 'text/javascript', innerHTML: 'document.getElementsByTagName("html")[0].className+=" js"'},
            {
              src: '//use.typekit.net/ioi4abv.js',
              type: 'text/javascript',
              async: true,
              onLoad: 'try{Typekit.load({async:true, active: window.typekitLoaded || function(){}});}catch(e){}'
            },
            {type: 'text/javascript', innerHTML: 'try{Typekit.load({async:true});}catch(e){}'},
          ]}/>

        <Header/>

        <main className='site-main'>

          <ReactCSSTransitionGroup
            transitionName='sidebar'
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}>
            { this.props.sidebar }
          </ReactCSSTransitionGroup>

          <div id="main-content" class="main-content">

            { this.props.main }
              
          </div>

        </main>

        <Footer/>

        <ReactCSSTransitionGroup
          transitionName='fadeIn'
          transitionEnterTimeout={500}
          transitionLeave={false}>
          { routeName === 'home' ?
            <BackgroundImage image='Iceland-5497'/>
          : null }
        </ReactCSSTransitionGroup>

      </div>
    );
  }

}

export default App;
