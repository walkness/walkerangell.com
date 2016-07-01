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
    const { loaded } = this.state;
    return (
      <div
        className={`background-image ${ loaded ? 'loaded' : 'not-loaded' }`}
        style={{
          backgroundImage: loaded ? `url(${this.refs.img.currentSrc})` : 'none',
        }}>
        <img
          ref='img'
          className='dummy'
          onLoad={this.onLoad.bind(this)}
          src={require('../../../../../images/Iceland-5497.jpg')}
          style={{display: 'none'}}/>
      </div>
    );
  }
}

export default BackgroundImage;
