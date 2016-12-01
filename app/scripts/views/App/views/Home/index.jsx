import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import SocialLinks from '../../components/SocialLinks';
import CaptureLinks from '../../components/CaptureLinks';


const Home = () => (
  <div className='home'>

    <Helmet
      title='Walker Angell'
      titleTemplate='%s'
    />

    <section className='intro'>

      <div className='jumbotron'>

        <div className='container'>

          <h1>Hello!</h1>

          <CaptureLinks
            className='body'
            dangerouslySetInnerHTML={{
              __html: require('../../../../../../data/content/index.md'), // eslint-disable-line global-require, max-len
            }}
          />

          <Link to='/contact/' className='btn'>Say Hello</Link>

          <SocialLinks />

        </div>

      </div>

    </section>

  </div>
);

export default Home;
