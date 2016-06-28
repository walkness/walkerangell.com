import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';

import data from '../../../../../../data';


class Gallery extends Component {

  static contextTypes = {
    router: routerShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: [],
    };
  }

  componentWillMount() {
    const hash = this.props.location.hash.substring(1);
    const gallery = data.portfolio.categories[this.props.params.category].galleries[this.props.params.gallery];
    if (!hash || gallery.images.indexOf(hash) === -1)
      this.context.router.replace(Object.assign({}, this.props.location, {hash: `#${gallery.images[0]}`}));
  }

  componentDidMount() {
    this.boundKeyPressHandler = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.boundKeyPressHandler);
    const loaded = this.state.loaded;
    for (const img of this.refs.panel.getElementsByTagName('img')) {
      const key = img.dataset.imagekey;
      if (img.complete && this.state.loaded.indexOf(key) === -1)
        loaded.push(key);
    }
    this.scrollFilmstrip();
    this.setState({loaded: loaded});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.hash !== this.props.location.hash)
      this.scrollFilmstrip();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.category !== this.props.params.category || nextProps.params.gallery !== this.props.params.gallery) {
      this.setState({loaded: []});
      if (!nextProps.location.hash) {
        const gallery = data.portfolio.categories[nextProps.params.category].galleries[nextProps.params.gallery];
        this.context.router.push(Object.assign({}, nextProps.location, {hash: `#${gallery.images[0]}`}));
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.boundKeyPressHandler);
  }

  advanceImage(i) {
    const images = data.portfolio.categories[this.props.params.category].galleries[this.props.params.gallery].images;
    const current = this.props.location.hash.substring(1);
    const currentIndex = images.indexOf(current);
    let nextIndex = (((currentIndex + i) % images.length) + images.length) % images.length;
    this.context.router.push(Object.assign({}, this.props.location, {hash: `#${images[nextIndex]}`}));
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
    let current = this.props.location.hash.substring(1);
    if (!current || gallery.images.indexOf(current) === -1) current = gallery.images[0];
    const { loaded } = this.state;
    return (
      <div className='gallery centered-vertically centered-horizontally'>

        <Helmet title={`${gallery.title} | ${category.title}`}/>

        <ul ref='panel'>

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
                  sizes='(min-width: 769px) calc(100vw - 291px), 100vw'
                  data-imagekey={key}/>
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
                onClick={(e) => this.context.router.push(Object.assign({}, this.props.location, {hash: `#${key}`}))}>
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
