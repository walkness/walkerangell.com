/* globals window */

import React, { Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';


class CaptureLinks extends Component {
  static contextTypes = {
    router: routerShape.isRequired,
  };

  componentDidMount() {
    const container = this.content;
    const links = container.getElementsByTagName('a');
    if (links) {
      Array.from(links).forEach((link) => {
        link.addEventListener('click', this.handleLinkClick.bind(this));
      });
    }
  }

  handleLinkClick(e) {
    if (e.target.hostname === window.location.hostname) {
      e.preventDefault();
      this.context.router.push(e.target.pathname);
    }
  }

  render() {
    return <div ref={(c) => { this.content = c; }} {...this.props} />;
  }
}

export default CaptureLinks;
