import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';


class BackgroundImage extends Component {

  static propTypes = {
    onLoad: PropTypes.func,
    image: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onLoad: () => {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false,
    };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    if (this.img && this.img.complete) {
      this.setState({ loaded: true }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  onLoad(e) {
    this.setState({ loaded: true });
    this.props.onLoad(e);
  }

  render() {
    const { image } = this.props;
    const { loaded } = this.state;
    const imgSrc = this.img && (this.img.currentSrc || this.img.src);
    return (
      <div className={classNames({ loaded })} styleName='background-image-wrapper'>

        <div styleName='background' />

        <div
          styleName='background-image'
          style={{
            backgroundImage: loaded && this.img ? `url(${imgSrc})` : 'none',
          }}
        />

        <picture
          style={{ display: 'none' }}
          className='dummy'
        >

          <source
            srcSet={require(`images/home/${image}-750x1334crop.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-width: 400px) and (max-height: 700px) and (orientation: portrait) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-1536x2048crop.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-width: 768px) and (max-height: 1024px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 512px) and (max-height: 683px) and (orientation: portrait) and (max-resolution: 3.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-1242x2208crop.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-width: 900px) and (max-height: 1560px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 450px) and (max-height: 780px) and (orientation: portrait) and (max-resolution: 3.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x800.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 800px) and (max-resolution: 1.5dppx), (max-height: 400px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x1200.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 600px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x1600.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 1600px) and (max-resolution: 1.5dppx), (max-height: 800px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x2000.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 2000px) and (max-resolution: 1.5dppx), (max-height: 1000px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x2400.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 1200px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x2800.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 2800px) and (max-resolution: 1.5dppx), (max-height: 1440px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <source
            srcSet={require(`images/home/${image}-x3200.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            media='(max-height: 3200px) and (max-resolution: 1.5dppx), (max-height: 1600px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
          />

          <img
            ref={(c) => { this.img = c; }}
            onLoad={this.onLoad}
            src={require(`images/home/${image}.jpg`)} // eslint-disable-line global-require, import/no-dynamic-require, max-len
            role='presentation'
          />

        </picture>

        <div styleName='placeholder' />

      </div>
    );
  }
}

export default BackgroundImage;
