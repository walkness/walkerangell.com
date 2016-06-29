import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { development } from '../../../../../../data';
import PageHeader from '../../components/PageHeader';
import Project from './Project';


class Development extends Component {
  render() {
    return (
      <div id='development-list'>

        <Helmet title={development.sectionTitle}/>

        <div className='container'>
          <PageHeader title={development.sectionTitle}/>
        </div>

        { Object.keys(development.projects).map(slug => {
          return <Project key={slug} slug={slug} project={development.projects[slug]}/>
        }) }

      </div>
    );
  }
}

export default Development;
