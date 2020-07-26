/* globals window */

import React, { Component } from 'react';

declare global {
  /* eslint-disable no-var, vars-on-top */
  var Typekit: unknown;
  var onTypekitLoaded: () => void;
  /* eslint-enable no-var, vars-on-top */
}

interface State {
  typekitLoaded: boolean;
}

export const TypekitLoadedContext = React.createContext(false);

class TypekitLoadedProvider extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      typekitLoaded: typeof window !== 'undefined' && !!window.Typekit,
    };
  }

  componentDidMount(): void {
    window.onTypekitLoaded = this.handleTypekitLoaded.bind(this);
  }

  handleTypekitLoaded(): void {
    this.setState({ typekitLoaded: true });
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { typekitLoaded } = this.state;
    return (
      <TypekitLoadedContext.Provider value={typekitLoaded}>
        { children }
      </TypekitLoadedContext.Provider>
    );
  }
}

export default TypekitLoadedProvider;
