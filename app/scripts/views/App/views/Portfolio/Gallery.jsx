import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import data from '../../../../../../data';


class Gallery extends Component {

  constructor(props, context) {
    super(props, context);
    const gallery = data.portfolio.categories[props.params.category].galleries[props.params.gallery];
    this.state = {
      current: gallery.images[0],
    };
  }

  advanceImage(i) {
    const images = data.portfolio.categories[this.props.params.category].galleries[this.props.params.gallery].images;
    const currentIndex = images.indexOf(this.state.current);
    let nextIndex = (currentIndex + i) % images.length;
    console.log(nextIndex);
    this.setState({current: images[nextIndex]});
  }

  render() {
    const gallery = data.portfolio.categories[this.props.params.category].galleries[this.props.params.gallery];
    const { current } = this.state;
    return (
      <div className='gallery centered-vertically centered-horizontally'>

        <ul>

          { gallery.images.map(key => {
            const image = data.portfolio.images[key];
            const src = require('../../../../../images/' + image.filename);
            return (
              <li key={key} className={`gallery-image${ current === key ? ' current' : '' }`}>
                <img src={src}/>
              </li>
            )
          }) }

          <button className='next' onClick={this.advanceImage.bind(this, 1)}>Next</button>
          <button className='previous' onClick={this.advanceImage.bind(this, -1)}>Previous</button>

        </ul>

      </div>
    );
  }
}

export default Gallery;
