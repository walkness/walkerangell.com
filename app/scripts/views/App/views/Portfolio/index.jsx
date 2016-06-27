import React, { Component, PropTypes } from 'react';
import Galleries from './Galleries';
import Gallery from './Gallery';


class Portfolio extends Component {
  render() {
    return this.props.children;
  }
}

export default Portfolio;
export { Galleries };
export { Gallery };
