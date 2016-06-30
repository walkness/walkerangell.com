import React, { PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';
import { Link } from 'react-router';


const NavLink = (props, context) => {
  let liClassName = [];
  if (props.liClassName)
    liClassName.push(props.liClassName)
  if (props.callback(context.router.isActive(props.to, props.indexOnly))) {
    liClassName.push('active');
  } else {
    for (const route of props.additionalRoutes) {
      if (context.router.isActive(route, props.indexOnly)) {
        liClassName.push('active');
        break;
      }
    }
  }

  return (
    <li className={ liClassName.join(' ') }>
      { props.noLinkActive ?
        props.children
      : <Link {...props}/>}
      { props.dropdown }
    </li>
  )
}

NavLink.propTypes = {
  liClassName: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  additionalRoutes: PropTypes.array,
  indexOnly: PropTypes.bool,
  callback: PropTypes.func,
  noLinkActive: PropTypes.bool,
}

NavLink.defaultProps = {
  additionalRoutes: [],
  indexOnly: false,
  callback: (e) => e,
  noLinkActive: false,
}

NavLink.contextTypes = {
  router: routerShape,
}

export default NavLink;
