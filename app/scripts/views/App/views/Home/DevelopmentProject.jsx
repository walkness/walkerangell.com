import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Screen from '../../components/Screen';


const DevelopmentProject = ({ slug, project }) => {
  return (
    <li className={`project ${slug}`}>
      <Link to={{pathname: '/development/', hash: `#${slug}`}}>
        <h3>{project.name}</h3>
        { project.screenshot ?
        <Screen url={project.link} color={project.primaryColor}>
          <img src={require(`../../../../../images/${project.screenshot}`)}/>
        </Screen>
        : null }
      </Link>
    </li>
  );
}

export default DevelopmentProject;
