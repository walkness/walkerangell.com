import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const DevelopmentProject = ({ slug, project }) => {
  return (
    <li className={`project ${slug}`}>
      <Link to={{pathname: '/development/', hash: `#${slug}`}}>
        <h3>{project.name}</h3>
        { project.screenshot ?
          <img
            className='screenshot'
            src={require(`../../../../../images/${project.screenshot}`)}/>
        : null }
        <div className='overlay'/>
      </Link>
    </li>
  );
}

export default DevelopmentProject;
