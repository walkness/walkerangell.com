import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import data from '../../../../../../data';


class Gallery extends Component {

  constructor(props, context) {
    super(props, context);
    const gallery = data.portfolio.categories[props.params.category].galleries[props.params.gallery];
    this.state = {
      current: gallery.images[0],
      loaded: [],
    };
  }

  componentDidMount() {
    this.boundKeyPressHandler = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.boundKeyPressHandler);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current !== this.state.current)
      this.scrollFilmstrip();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params !== this.props.params) {
      const gallery = data.portfolio.categories[nextProps.params.category].galleries[nextProps.params.gallery];
      this.setState({current: gallery.images[0], loaded: []});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.boundKeyPressHandler);
  }

  advanceImage(i) {
    const images = data.portfolio.categories[this.props.params.category].galleries[this.props.params.gallery].images;
    const currentIndex = images.indexOf(this.state.current);
    let nextIndex = (((currentIndex + i) % images.length) + images.length) % images.length;
    this.setState({current: images[nextIndex]});
  }

  handleKeyPress(e) {
    if (e.which === 37) {
      this.advanceImage(-1);
    } else if (e.which === 39) {
      this.advanceImage(1);
    }
  }

  scrollFilmstrip() {
    const filmstripWidth = this.refs.filmstrip.getBoundingClientRect().width;
    const currentImage = this.refs.filmstrip.getElementsByClassName('current')[0];
    const currentImageRect = currentImage.getBoundingClientRect();
    const left = currentImage.offsetLeft;
    const currentImageWidth = currentImage.offsetWidth;
    const center = left + currentImageWidth / 2;
    const filmstripCenter = filmstripWidth / 2;
    const scroll = Math.max(Math.round(center - filmstripCenter), 0);
    if (scroll !== this.refs.filmstrip.scrollLeft)
      this.scrollFilmstripWithOffset(scroll);
  }

  scrollFilmstripWithOffset(offset, scrollDuration=200, finished=()=>{}) {
    const element = this.refs.filmstrip;
    const scrollWidth = element.scrollLeft;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = (offset - scrollWidth) / 2;
    const numIterations = Math.ceil(scrollDuration / 15, 1);
    let scrollCount = 0;
    let scrollMargin;
    requestAnimationFrame(step);
    function step() {
      setTimeout(function() {
        if (scrollCount < numIterations) {
          requestAnimationFrame(step);
          scrollCount++;
          if (scrollCount === numIterations)
            scrollMargin = cosParameter * 2;
          else
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
          element.scrollLeft = scrollMargin + scrollWidth;
        } else {
          finished();
        }
      }, 15);
    }
  }

  render() {
    const category = data.portfolio.categories[this.props.params.category];
    const gallery = category.galleries[this.props.params.gallery];
    const { current, loaded } = this.state;
    return (
      <div className='gallery centered-vertically centered-horizontally'>

        <Helmet title={`${gallery.title} | ${category.title}`}/>

        <ul>

          { gallery.images.map(key => {
            const image = data.portfolio.images[key];
            const src830 = require(`../../../../../images/${image.filename}-830x830.jpg`);
            const src1640 = require(`../../../../../images/${image.filename}-1640x1640.jpg`);
            const src3280 = require(`../../../../../images/${image.filename}-3280x3280.jpg`);
            return (
              <li key={key} className={`gallery-image${ current === key ? ' current' : '' }`}>
                <img
                  onLoad={(e) => this.setState({loaded: [...loaded, key]})}
                  src={src1640}
                  srcSet={`${src830} 830w, ${src1640} 1640w, ${src3280} 3280w`}
                  sizes='(min-width: 769px) calc(100vw - 291px), 100vw'/>
              </li>
            )
          }) }

          <button className='next' onClick={this.advanceImage.bind(this, 1)}>Next</button>
          <button className='previous' onClick={this.advanceImage.bind(this, -1)}>Previous</button>

        </ul>

        <ul className='filmstrip' ref='filmstrip'>

          { gallery.images.map(key => {
            const image = data.portfolio.images[key];
            const src50 = require(`../../../../../images/${image.filename}-x50.jpg`);
            const src830 = require(`../../../../../images/${image.filename}-830x830.jpg`);
            const src1640 = require(`../../../../../images/${image.filename}-1640x1640.jpg`);
            const src3280 = require(`../../../../../images/${image.filename}-3280x3280.jpg`);
            return (
              <li
                key={key}
                className={`gallery-image${ current === key ? ' current' : '' }`}
                onClick={(e) => this.setState({current: key})}>
                { loaded.indexOf(key) === -1 ?
                  <img src={src50} className='placeholder'/>
                :
                  <img
                    src={src1640}
                    srcSet={`${src830} 830w, ${src1640} 1640w, ${src3280} 3280w`}
                    sizes='(min-width: 769px) calc(100vw - 291px), 100vw'/>
                }
              </li>
            )
          }) }

        </ul>

      </div>
    );
  }
}

export default Gallery;
