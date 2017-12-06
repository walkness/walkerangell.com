import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Screen from 'AppComponents/Screen';


const DevelopmentProject = ({ slug, project }) => (
  <li className={`project ${slug}`}>

    <Link to={{ pathname: '/development/', hash: `#${slug}` }}>

      <h3>{project.name}</h3>

      { project.screenshot ?
        <Screen url={project.link} color={project.primaryColor}>

          <img
            src={require(`images/${project.screenshot}`)} // eslint-disable-line import/no-dynamic-require, global-require, max-len
            alt={project.title}
          />

        </Screen>
      : null }

    </Link>

  </li>
);

DevelopmentProject.propTypes = {
  slug: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
};

export default DevelopmentProject;
