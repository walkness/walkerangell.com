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
                
                <h1>Hello</h1>

                <div className='body' dangerouslySetInnerHTML={{__html: require('../../../../../../data/content/index.md')}}/>

                <SocialLinks/>

              </div>

            </div>
        </section>

        <section className='development'>
          <div className='container'>

            <h2><Link to='/development/'>{data.development.sectionTitle}</Link></h2>

            <ul className='projects'>
            { Object.keys(data.development.projects).map(
                slug => <DevelopmentProject key={slug} slug={slug} project={data.development.projects[slug]}/>) }
            </ul>

          </div>
        </section>

        <section className='photography'>
          <div className='container'>

            <h2><Link to='/photography/'>{data.photography.sectionTitle}</Link></h2>



          </div>
        </section>

      </div>
    )
  }
}

export default Home;
