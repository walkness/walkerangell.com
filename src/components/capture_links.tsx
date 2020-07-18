/* globals window */

import React, { Component } from 'react';
import { navigate } from 'gatsby';

type Props = React.HTMLAttributes<HTMLDivElement>

const handleLinkClick = (e: MouseEvent): void => {
  if (e?.target instanceof HTMLAnchorElement && e?.target?.hostname === window.location.hostname) {
    e.preventDefault();
    navigate(e.target.pathname);
  }
};

class CaptureLinks extends Component<Props> {
  private content = React.createRef<HTMLDivElement>()

  componentDidMount(): void {
    const { current: container } = this.content || {};
    const links = container?.getElementsByTagName('a');
    if (links) {
      Array.from(links).forEach((link) => {
        link.addEventListener('click', handleLinkClick);
      });
    }
  }

  render(): React.ReactNode {
    return <div ref={this.content} {...this.props} />;
  }
}

export default CaptureLinks;
