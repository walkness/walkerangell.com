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
          <div className='container'>

            <div className='jumbotron'>
              
              <h1>Hello</h1>

              <p>I'm Walker Angell, I live in Brooklyn, NY, and I really like web/app development and photography.</p>

              <SocialLinks/>

            </div>

          </div>
        </section>

        <section className='development'>
          <div className='container'>

            <h2>{data.development.sectionTitle}</h2>

            <ul className='projects'>
            { Object.keys(data.development.projects).map(
                slug => <DevelopmentProject key={slug} slug={slug} project={data.development.projects[slug]}/>) }
            </ul>

          </div>
        </section>

        <section className='photography'>

        </section>

      </div>
    )
  }
}

export default Home;
