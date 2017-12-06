import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import SocialLinks from 'AppComponents/SocialLinks';
import CaptureLinks from 'AppComponents/CaptureLinks';

import './styles.scss';


const Home = () => (
  <div styleName='home'>

    <Helmet
      title='Walker Angell'
      titleTemplate='%s'
    />

    <section className='intro'>

      <div className='jumbotron jumbotron-fluid' styleName='jumbotron'>

        <div className='container'>

          <h1 className='display-3'>Hello!</h1>

          <CaptureLinks
            className='body lead'
            dangerouslySetInnerHTML={{
              __html: require('data/content/index.md'), // eslint-disable-line global-require, max-len
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
