import React, { Component, PropTypes } from 'react';


class LazyImg extends Component {

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
    const props = Object.assign({}, this.props, {
      className: [this.props.className, this.state.loaded ? 'loaded' : 'not-loaded'].join(' '),
      onLoad: this.onLoad.bind(this),
    });
    return <img ref='img' {...props}/>
  }
}

export default LazyImg;
