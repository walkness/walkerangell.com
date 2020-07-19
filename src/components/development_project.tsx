import React from 'react';
import PropTypes from 'prop-types';

import { monthNames, development } from '@/data';
import Screen from '@/components/screen';
import CaptureLinks from '@/components/capture_links';

import styles from './development_project.module.scss';

interface Project {
  slug: string;
  name: string;
  shortName?: string;
  link?: string;
  launchDate?: string | null;
  primaryColor?: [number, number, number];
  technologies?: string[];
  hosting?: string[];
  screenshot?: {
    childImageSharp: {
      size455: { src: string; };
      size910: { src: string; };
      size1365: { src: string; };
    };
  };
}

interface Props {
  slug: string;
  project: Project;
  content?: string;
}

const Project: React.FC<Props> = ({ slug, project, content }) => {
  const ProjectLink: React.FC = ({ children }) => (
    <a href={project.link} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );

  ProjectLink.propTypes = {
    children: PropTypes.node,
  };

  ProjectLink.defaultProps = {
    children: null,
  };

  const {
    launchDate: launchDateStr,
    screenshot: {
      childImageSharp: {
        size455: { src: screen455 } = {},
        size910: { src: screen910 } = {},
        size1365: { src: screen1365 } = {},
      } = {},
    } = {},
  } = project;

  const launchDate = launchDateStr && new Date(launchDateStr);

  return (
    <article
      className={styles.project}
      id={slug}
      style={project.primaryColor && {
        backgroundColor: `rgba(${project.primaryColor.join(', ')}, .05)`,
        borderBottomColor: `rgba(${project.primaryColor.join(', ')}, .1)`,
      }}
    >

      <div className='container'>

        <div className='row'>

          <div className={styles.content}>

            <h3>
              { project.name }
            </h3>

            <p>
              <span
                className={`badge ${styles.badge}`}
                style={{ backgroundColor: `rgb(${project.primaryColor.join(', ')})` }}
              >
                {launchDate ?
                  `${monthNames[launchDate.getMonth() - 1]} ${launchDate.getFullYear()}` // eslint-disable-line max-len
                : 'TBA'}
              </span>
              <ProjectLink>{project.link}</ProjectLink>
            </p>

            <div className='row'>
              { project.technologies && project.technologies.length > 0 ?
                <div className={styles.technologies}>
                  <p><strong>Technologies</strong></p>
                  <ul>
                    { project.technologies.map((key) => {
                      const tech = development.technologies[key];
                      return (
                        <li key={key}>
                          <a
                            href={tech.link}
                            title={tech.title}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {tech.title}
                          </a>
                        </li>
                      );
                    }) }
                  </ul>
                </div>
              : null }

              { project.hosting && project.hosting.length > 0 ?
                <div className={styles.hosting}>
                  <p><strong>Hosting</strong></p>
                  <ul>
                    { project.hosting.map((key) => {
                      const item = development.hosting[key];
                      return (
                        <li key={key}>
                          <a
                            href={item.link}
                            title={item.title}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {item.title}
                          </a>
                        </li>
                      );
                    }) }
                  </ul>
                </div>
              : null }
            </div>

            <CaptureLinks
              className='body'
              dangerouslySetInnerHTML={{ __html: content }}
            />

          </div>

          <div className={styles.screenshot}>
            <ProjectLink>
              <Screen url={project.link} color={project.primaryColor}>
                <img
                  src={screen455}
                  srcSet={`${screen455} 455w, ${screen910} 910w, ${screen1365} 1365w`}
                  sizes='(min-width: 1200px) 452px, (min-width: 992px) 369px, (min-width: 768px) 277px, calc(100vw - 40px)' // eslint-disable-line max-len
                  alt={project.name}
                />
              </Screen>
            </ProjectLink>
          </div>

        </div>

      </div>

    </article>
  );
};

export default Project;
