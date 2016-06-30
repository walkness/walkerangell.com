import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import LazyImg from '../../components/LazyImg';
import { photography } from '../../../../../../data';


class Galleries extends Component {
  render() {
    const isGallery = this.props.params && this.props.params.category && true;
    const title = isGallery ? photography.portfolio.categories[this.props.params.category].title : photography.portfolio.title;
    const galleries = isGallery ? photography.portfolio.categories[this.props.params.category].galleries : photography.portfolio.categories;

    let i = 0;

    return (
      <div>

        <Helmet title={title}/>

        <ul className='galleries'>

          { Object.keys(galleries).map(slug => {
            const gallery = galleries[slug];
            const src350 = require(`../../../../../images/${photography.portfolio.images[gallery.featured].filename}-350x350.jpg`);
            const src700 = require(`../../../../../images/${photography.portfolio.images[gallery.featured].filename}-700x700.jpg`);
            i++;
            return (
              <li key={i}>
                <Link to={this.props.location.pathname + slug + '/'}>
                  <LazyImg src={src350} srcSet={`${src350} 1x, ${src700} 2x`}/>
                  <span className='name'>{gallery.title}</span>
                </Link>
              </li>
            )
          }) }

        </ul>

      </div>
    );
  }
}

export default Galleries;
