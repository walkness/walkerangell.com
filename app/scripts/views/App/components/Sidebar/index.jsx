import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from '../NavLink';

import data from '../../../../../../data';

const Sidebar = ({}) => {

  const portfolioDropdown = () => {
    let i = 0;
    return (
      <ul className='sub-menu'>
        { Object.keys(data.portfolio.categories).map(slug1 => {
          const gallery1 = data.portfolio.categories[slug1];
          i++;
          const subMenu = () => {
            let j = 0;
            return (
              <ul className='sub-menu'>
                { Object.keys(gallery1.galleries).map(slug2 => {
                  const gallery2 = gallery1.galleries[slug2];
                  j++;
                  return <NavLink key={j} to={`/portfolio/${slug1}/${slug2}/`}>{gallery2.title}</NavLink>
                }) }
              </ul>
            );
          }
          return <NavLink key={i} to={`/portfolio/${slug1}/`} dropdown={subMenu()}>{gallery1.title}</NavLink>
        })}
      </ul>
    )
  }

  return (
    <aside id='sidebar'>

      <div className='mobile-nav'>

        <h1 className='site-title'>
          <Link to='/'>Walker Angell</Link>
        </h1>

        <button id='menu-collapse-button' className='collapsed'>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </button>

      </div>

      <nav id='menu-main-nav'>
        <ul className='menu'>

          <NavLink
            to='/portfolio/'
            className='menu-item menu-item-has-children'
            dropdown={portfolioDropdown()}>
            Portfolio
          </NavLink>

        </ul>
      </nav>

    </aside>
  )
}

export default Sidebar;