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
    const attorneysWithPage = Object.keys(attorneys).filter(slug => {
      const attorney = attorneys[slug];
      return attorney.includePage;
    });

    const attorneysDropdown = (
      <ul className='dropdown-menu'>
        { attorneysWithPage.map(slug => {
          const attorney = attorneys[slug];
          return <NavLink key={slug} to={`/attorneys/${slug}/`}>{attorney.name}</NavLink>                
        }) }
      </ul>
    );

    const practiceAreasDropdown = (
      <ul className='dropdown-menu'>
        { Object.keys(practiceAreas).map(slug => {
          const area = practiceAreas[slug];
          return <NavLink key={slug} to={`/practice-areas/${slug}/`}>{area.title}</NavLink>                
        }) }
      </ul>
    );

    const { collapsed } = this.state;

    return (
      <header>

        <div className='container'>

          <div className='logo'>
            <Link to='/'><img src={logo}/></Link>
          </div>

          <nav className='navbar navbar-inverse'>

            <button
              type='button'
              className={`navbar-toggle ${ collapsed ? 'collapsed' : 'active'}`}
              data-toggle='collapse'
              aria-expanded={ collapsed ? 'false' : 'true' }
              onClick={(e) => this.setState({collapsed: !collapsed})}>
              Menu
            </button>

            <div className={`collapse navbar-collapse${ collapsed ? '' : ' in' }`}>
              <ul className='nav navbar-nav'>

                <NavLink to='/' indexOnly={true}>Home</NavLink>

                <NavLink to='/attorneys/' dropdown={attorneysDropdown}>Attorney Profiles</NavLink>

                <NavLink to='/practice-areas/' dropdown={practiceAreasDropdown}>Practice Areas</NavLink>

                <NavLink to='/clients/'>Clients</NavLink>

                <NavLink to='/directions/'>Map & Directions</NavLink>

                <NavLink to='/news/'>Recent News and Results</NavLink>

                <NavLink to='/contact/'>Contact Us</NavLink>

              </ul>
            </div>
          </nav>

          <div className='header-image'>
            <img src={header_image}/>
          </div>

        </div>

      </header>
    )
  }
}

export default Header;
