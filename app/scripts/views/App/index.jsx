import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';

import Footer from './components/Footer';
import Sidebar from './components/Sidebar';


class App extends Component {
  render() {
    const routeName = this.props.children.props.route.name;
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
            {
              src: '//use.typekit.net/ioi4abv.js',
              type: 'text/javascript',
              async: true,
              onLoad: 'try{Typekit.load({async:true});}catch(e){}'
            },
            {type: 'text/javascript', innerHTML: 'try{Typekit.load({async:true});}catch(e){}'},
          ]}/>

        { routeName === 'home' ?
          <div id='background_img'/>
        : null }

        <main className='site-main'>

          <Sidebar location={this.props.location}/>

          <div id="main-content" class="main-content">

            <div id="primary" class="content-area">

              <div id="content" class="site-content" role="main">

                { this.props.children }

              </div>
              
            </div>

            <Footer/>

          </div>

        </main>

      </div>
    );
  }

}

export default App;
