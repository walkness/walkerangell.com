import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { attorneys, practiceAreas } from '../../../../../../data';
import logo from '../../../../../images/logo.svg';
import header_image from '../../../../../images/header_image.jpg';

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

        </div>

      </header>
    )
  }
}

export default Header;
