import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LazyImg extends Component {

  static propTypes = {
    onLoad: PropTypes.func,
    className: PropTypes.string,
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
      this.setState({ loaded: true });  // eslint-disable-line react/no-did-mount-set-state
    }
  }

  onLoad(e) {
    this.setState({ loaded: true });
    this.props.onLoad(e);
  }

  render() {
    const props = Object.assign({}, this.props, {
      className: [this.props.className, this.state.loaded ? 'loaded' : 'not-loaded'].join(' '),
      onLoad: this.onLoad,
    });
    return <img ref={c => { this.img = c; }} {...props} />; // eslint-disable-line jsx-a11y/img-has-alt, max-len
  }
}

export default LazyImg;
