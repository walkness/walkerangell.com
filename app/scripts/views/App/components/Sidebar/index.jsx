import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from '../NavLink';

import data from '../../../../../../data';

class Sidebar extends Component {

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
    const portfolioDropdown = () => {
      let i = 0;
      return (
        <ul className='sub-menu'>
          { Object.keys(data.photography.portfolio.categories).map(slug1 => {
            const gallery1 = data.photography.portfolio.categories[slug1];
            i++;
            const subMenu = () => {
              let j = 0;
              return (
                <ul className='sub-menu'>
                  { Object.keys(gallery1.galleries).map(slug2 => {
                    const gallery2 = gallery1.galleries[slug2];
                    j++;
                    return <NavLink key={j} to={`/photography/${slug1}/${slug2}/`}>{gallery2.title}</NavLink>
                  }) }
                </ul>
              );
            }
            return (
              <NavLink
                key={i}
                liClassName='menu-item menu-item-has-children'
                to={`/photography/${slug1}/`}
                dropdown={subMenu()}
                indexOnly={true}>
                {gallery1.title}
              </NavLink>)
          })}
        </ul>
      )
    }

    const { collapsed } = this.state;

    return (
      <aside id='sidebar'>

        <nav id='photo-nav' className={collapsed ? 'collapsed' : 'not-collapsed'}>
          <ul className='menu'>

            <NavLink
              to='/photography/'
              liClassName='menu-item menu-item-has-children'
              dropdown={portfolioDropdown()}
              indexOnly={true}>
              {data.photography.portfolio.title}
            </NavLink>

          </ul>
        </nav>

      </aside>
    )
  }
}

export default Sidebar;
