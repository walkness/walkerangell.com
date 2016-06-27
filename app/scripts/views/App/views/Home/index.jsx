import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';


class Home extends Component {
  render() {
    return (
      <div className='home'>

        <Helmet
          title='Walker Angell'
          titleTemplate='%s'/>

      </div>
    )
  }
}

export default Home;
