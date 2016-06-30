import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import NavLink from '../NavLink';


class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location)
      this.setState({collapsed: true});
  }

  render() {
    const { collapsed } = this.state;
    return (
      <header>

        <div className='container'>

          <nav>

            <Link to='/development/' activeClassName='active'>
              Development
            </Link>

            <IndexLink to='/' className='site-title' activeClassName='active'>
              Walker Angell
            </IndexLink>

            <Link to='/photography/' activeClassName='active'>
              Photography
            </Link>

          </nav>

        </div>

      </header>
    )
  }
}

export default Header;
