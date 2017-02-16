/* globals document requestAnimationFrame */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { routerShape, locationShape } from 'react-router/lib/PropTypes';
import classNames from 'classnames';

import NavLink from '../../components/NavLink';
import LazyImg from '../../components/LazyImg';
import { photography } from '../../../../../../data';


class Gallery extends Component {

  static propTypes = {
    location: locationShape.isRequired,
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: routerShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: [],
    };
    this.advanceImage = this.advanceImage.bind(this);
  }

  componentWillMount() {
    const { location, params } = this.props;
    const hash = location.hash.substring(1);
    const gallery = photography.portfolio.categories[params.category].galleries[params.gallery];
    if (!hash || gallery.images.indexOf(hash) === -1) {
      this.context.router.replace(Object.assign({}, this.props.location, {
        hash: `#${gallery.images[0]}`,
      }));
    }
  }

  componentDidMount() {
    this.boundKeyPressHandler = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.boundKeyPressHandler);
    const loaded = this.state.loaded;
    Array.from(this.panel.getElementsByTagName('img')).forEach(img => {
      const key = img.dataset.imagekey;
      if (img.complete && this.state.loaded.indexOf(key) === -1) {
        loaded.push(key);
      }
    });
    this.scrollFilmstrip();
    this.setState({ loaded }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.params.category !== this.props.params.category ||
      nextProps.params.gallery !== this.props.params.gallery
    ) {
      this.setState({ loaded: [] });
      const { location, params } = nextProps;
      if (!location.hash) {
        const gallery = photography.portfolio.categories[params.category].galleries[params.gallery];
        this.context.router.push(Object.assign({}, location, { hash: `#${gallery.images[0]}` }));
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.scrollFilmstrip();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.boundKeyPressHandler);
  }

  advanceImage(i) {
    const { location } = this.props;
    const { category, gallery } = this.props.params;
    const images = photography.portfolio.categories[category].galleries[gallery].images;
    const current = location.hash.substring(1);
    const currentIndex = images.indexOf(current);
    const nextIndex = (((currentIndex + i) % images.length) + images.length) % images.length;
    this.context.router.push(Object.assign({}, location, { hash: `#${images[nextIndex]}` }));
  }

  handleKeyPress(e) {
    if (e.which === 37) {
      this.advanceImage(-1);
    } else if (e.which === 39) {
      this.advanceImage(1);
    }
  }

  scrollFilmstrip() {
    const filmstripWidth = this.filmstrip.getBoundingClientRect().width;
    const currentImage = this.filmstrip.getElementsByClassName('current')[0];
    const left = currentImage.offsetLeft;
    const currentImageWidth = currentImage.offsetWidth;
    const center = left + (currentImageWidth / 2);
    const filmstripCenter = filmstripWidth / 2;
    const scroll = Math.max(Math.round(center - filmstripCenter), 0);
    if (scroll !== this.filmstrip.scrollLeft) {
      this.scrollFilmstripWithOffset(scroll);
    }
  }

  scrollFilmstripWithOffset(offset, scrollDuration = 200, finished = () => {}) {
    const element = this.filmstrip;
    const scrollWidth = element.scrollLeft;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = (offset - scrollWidth) / 2;
    const numIterations = Math.ceil(scrollDuration / 15, 1);
    let scrollCount = 0;
    let scrollMargin;
    function step() {
      setTimeout(function () { // eslint-disable-line prefer-arrow-callback
        if (scrollCount < numIterations) {
          requestAnimationFrame(step);
          scrollCount++;
          if (scrollCount === numIterations) {
            scrollMargin = cosParameter * 2;
          } else {
            scrollMargin = cosParameter - (cosParameter * Math.cos(scrollCount * scrollStep));
          }
          element.scrollLeft = scrollMargin + scrollWidth;
        } else {
          finished();
        }
      }, 15);
    }
    requestAnimationFrame(step);
  }

  render() {
    const category = photography.portfolio.categories[this.props.params.category];
    const gallery = category.galleries[this.props.params.gallery];
    let current = this.props.location.hash.substring(1);
    if (!current || gallery.images.indexOf(current) === -1) current = gallery.images[0];
    const { loaded } = this.state;
    return (
      <div className='gallery centered-vertically centered-horizontally'>

        <Helmet title={`${gallery.title} | ${category.title}`} />

        <div className='container'>
          <ol className='breadcrumb'>

            <NavLink
              liClassName='breadcrumb-item'
              to={`/photography/${this.props.params.category}/`}
              indexOnly
            >
              {category.title}
            </NavLink>

            <NavLink
              liClassName='breadcrumb-item'
              to={`/photography/${this.props.params.category}/${this.props.params.gallery}/`}
              noLinkActive
            >
              {gallery.title}
            </NavLink>

          </ol>
        </div>

        <ul ref={c => { this.panel = c; }} className='panel'>

          { gallery.images.map(key => {
            const image = photography.portfolio.images[key];

            /* eslint-disable global-require */
            const src830 = require(`../../../../../images/${image.filename}-830x830.jpg`);
            const src1640 = require(`../../../../../images/${image.filename}-1640x1640.jpg`);
            const src3280 = require(`../../../../../images/${image.filename}-3280x3280.jpg`);
            const size = require(`image-size?name=images/[name].[ext]!../../../../../images/${image.filename}-1640x1640.jpg`); // eslint-disable-line max-len
            /* eslint-enable global-require */
            return (
              <li
                key={key}
                className={classNames('gallery-image', { current: current === key })}
              >
                <LazyImg
                  onLoad={() => this.setState({ loaded: [...loaded, key] })}
                  width={size.width}
                  height={size.height}
                  src={src1640}
                  srcSet={`${src830} 830w, ${src1640} 1640w, ${src3280} 3280w`}
                  sizes='(min-width: 769px) calc(100vw - 291px), 100vw'
                  alt={key}
                  data-imagekey={key}
                />
              </li>
            );
          }) }

          <button className='next' onClick={() => this.advanceImage(1)}>Next</button>
          <button className='previous' onClick={() => this.advanceImage(-1)}>Previous</button>

        </ul>

        <ul className='filmstrip' ref={c => { this.filmstrip = c; }}>

          { gallery.images.map(key => {
            const image = photography.portfolio.images[key];
            /* eslint-disable global-require */
            const src50 = require(`../../../../../images/${image.filename}-x50.jpg`);
            const src830 = require(`../../../../../images/${image.filename}-830x830.jpg`);
            const src1640 = require(`../../../../../images/${image.filename}-1640x1640.jpg`);
            const src3280 = require(`../../../../../images/${image.filename}-3280x3280.jpg`);
            /* eslint-enable global-require */
            return (
              <li
                key={key}
                className={classNames('gallery-image', { current: current === key })}
                onClick={() => this.context.router.push(Object.assign({}, this.props.location, {
                  hash: `#${key}`,
                }))}
              >
                { loaded.indexOf(key) === -1 ?
                  <LazyImg src={src50} className='placeholder' />
                :
                  <LazyImg
                    src={src1640}
                    srcSet={`${src830} 830w, ${src1640} 1640w, ${src3280} 3280w`}
                    sizes='(min-width: 769px) calc(100vw - 291px), 100vw'
                  />
                }
              </li>
            );
          }) }

        </ul>

      </div>
    );
  }
}

export default Gallery;
