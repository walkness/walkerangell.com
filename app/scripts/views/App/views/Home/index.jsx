import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import data from '../../../../../../data';
import SocialLinks from '../../components/SocialLinks';
import DevelopmentProject from './DevelopmentProject';


class Home extends Component {
  render() {
    return (
      <div className='home'>

        <Helmet
          title='Walker Angell'
          titleTemplate='%s'/>

        <section className='intro'>

            <div className='jumbotron'>

              <div className='container'>
                
                <h1>Hello!</h1>

                <div className='body' dangerouslySetInnerHTML={{__html: require('../../../../../../data/content/index.md')}}/>

                <Link to='/contact/' className='btn'>Say Hello</Link>

                <SocialLinks/>

              </div>

            </div>
        </section>

      </div>
    )
  }
}

export default Home;
