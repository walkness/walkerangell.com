import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import Helmet from 'react-helmet';
import cx from 'classnames';

import SocialLinks from '@/components/social_links';
import CaptureLinks from '@/components/capture_links';

import styles from './index.module.scss';

interface Props extends PageProps {
  data: {
    file: {
      childMarkdownRemark: {
        html: string;
      };
    };
  };
}

const Home: React.FC<Props> = ({ data }) => (
  <div className={styles.home}>

    <Helmet
      title='Walker Angell'
      titleTemplate='%s'
    />

    <section className='intro'>

      <div className={cx('jumbotron jumbotron-fluid', styles.jumbotron)}>

        <div className='container'>

          <h1 className='display-3'>Hello!</h1>

          <CaptureLinks
            className='body lead'
            dangerouslySetInnerHTML={{
              __html: data.file.childMarkdownRemark.html,
            }}
          />

          <Link to='/contact/' className='btn'>Say Hello</Link>

          <SocialLinks />

        </div>

      </div>

    </section>

  </div>
);

export const pageQuery = graphql`
  query {
    file(relativePath: {eq: "content/index.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`;

export default Home;
