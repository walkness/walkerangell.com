import React, { Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';


class CaptureLinks extends Component {

  static contextTypes = {
    router: routerShape.isRequired,
  };

  componentDidMount() {
    const container = this.refs.content;
    const links = container.getElementsByTagName('a');
    for (const link of links) {
      link.addEventListener('click', this.handleLinkClick.bind(this))
    }
  }

  handleLinkClick(e) {
    if (e.target.hostname === window.location.hostname) {
      e.preventDefault();
      this.context.router.push(e.target.pathname);
    }
  }

  render() {
    return <div ref='content' {...this.props}/>
  }
}

export default CaptureLinks;
