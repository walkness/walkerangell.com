import React, { Component } from 'react';
import cx from 'classnames';

type onLoadHandler = (event: React.SyntheticEvent<HTMLImageElement>) => void;

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoad?: onLoadHandler;
}

interface State {
  loaded: boolean;
}

class LazyImg extends Component<Props, State> {
  readonly state: State = { loaded: false };

  private img = React.createRef<HTMLImageElement>();

  componentDidMount(): void {
    const { current: img } = this.img;
    if (img && img.complete) {
      this.setState({ loaded: true }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  onLoad: onLoadHandler = (e) => {
    const { onLoad } = this.props;
    this.setState({ loaded: true });
    if (onLoad) onLoad(e);
  }

  render(): React.ReactNode {
    const { className, ...rest } = this.props;
    const { loaded } = this.state;
    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        ref={this.img}
        className={cx(className, { 'not-loaded': !loaded, loaded })}
        {...rest}
        onLoad={this.onLoad}
      />
    );
  }
}

export default LazyImg;
