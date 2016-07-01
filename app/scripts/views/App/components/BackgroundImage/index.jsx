import React, { Component, PropTypes } from 'react';


class BackgroundImage extends Component {

  static propTypes = {
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    onLoad: (e) => {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    if (this.refs.img && this.refs.img.complete)
      this.setState({loaded: true});
  }

  onLoad(e) {
    this.setState({loaded: true});
    this.props.onLoad(e);
  }

  render() {
    const { image } = this.props;
    const { loaded } = this.state;
    return (
      <div className='background-image-wrapper'>

        <div
          className={`background-image ${ loaded ? 'loaded' : 'not-loaded' }`}
          style={{
            backgroundImage: loaded ? `url(${this.refs.img.currentSrc || this.refs.img.src})` : 'none',
          }}/>

        <picture
          style={{display: 'none'}}
          className='dummy'>

          <source
            srcSet={require(`../../../../../images/home/${image}-750x1334crop.jpg`)}
            media='(max-width: 400px) and (max-height: 700px) and (orientation: portrait) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-1536x2048crop.jpg`)}
            media='(max-width: 768px) and (max-height: 1024px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 512px) and (max-height: 683px) and (orientation: portrait) and (max-resolution: 3.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-1242x2208crop.jpg`)}
            media='(max-width: 900px) and (max-height: 1560px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 450px) and (max-height: 780px) and (orientation: portrait) and (max-resolution: 3.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x800.jpg`)}
            media='(max-height: 800px) and (max-resolution: 1.5dppx), (max-height: 400px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x1200.jpg`)}
            media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 600px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x1600.jpg`)}
            media='(max-height: 1600px) and (max-resolution: 1.5dppx), (max-height: 800px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x2000.jpg`)}
            media='(max-height: 2000px) and (max-resolution: 1.5dppx), (max-height: 1000px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x2400.jpg`)}
            media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 1200px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x2800.jpg`)}
            media='(max-height: 2800px) and (max-resolution: 1.5dppx), (max-height: 1440px) and (max-resolution: 2.5dppx)'/>

          <source
            srcSet={require(`../../../../../images/home/${image}-x3200.jpg`)}
            media='(max-height: 3200px) and (max-resolution: 1.5dppx), (max-height: 1600px) and (max-resolution: 2.5dppx)'/>

          <img
            ref='img'
            onLoad={this.onLoad.bind(this)}
            src={require(`../../../../../images/home/${image}.jpg`)}/>

        </picture>

        <div className='placeholder'/>

      </div>
    );
  }
}

export default BackgroundImage;
