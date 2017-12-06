import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { locationShape } from 'react-router/lib/PropTypes';

import './styles.scss';


class Header extends Component {

  static propTypes = {
    location: locationShape,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ collapsed: true });
    }
  }

  render() {
    return (
      <header styleName='header'>

        <div className='container'>

          <nav>

            <IndexLink to='/' className='hidden-sm-up' styleName='site-title' activeClassName='active'>
              Walker Angell
            </IndexLink>

            <Link to='/development/' activeClassName='active'>
              Development
            </Link>

            <IndexLink to='/' className='hidden-xs-down' styleName='site-title' activeClassName='active'>
              Walker Angell
            </IndexLink>

            <Link to='/photography/' activeClassName='active'>
              Photography
            </Link>

          </nav>

        </div>

      </header>
    );
  }
}

export default Header;
