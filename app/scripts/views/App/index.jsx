import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';

import Footer from './components/Footer';
import Sidebar from './components/Sidebar';


class App extends Component {
  render() {
    return (
      <div id='app'>

        <Helmet
          htmlAttributes={{'lang': 'en'}}
          defaultTitle='Walker Angell'
          titleTemplate='%s | Walker Angell'/>

        <main className='site-main'>

          <Sidebar/>

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
