import React from 'react';

import { monthNames, development } from '@/data';
import Screen from '@/components/screen';
import CaptureLinks from '@/components/capture_links';

import styles from './development_project.module.scss';

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, ...rest }) => (
  <a target='_blank' rel='noopener noreferrer' {...rest}>{ children }</a>
);

const { technologies, hosting } = development;

const isValidTechnology = (key: string): key is keyof typeof technologies => key in technologies;

const getTechnology = (key: string) => (isValidTechnology(key) ? technologies[key] : undefined);

const isValidHosting = (key: string): key is keyof typeof hosting => key in hosting;

const getHosting = (key: string) => (isValidHosting(key) ? hosting[key] : undefined);

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
      fluid: { srcSet: string; src: string; };
    };
  };
}

interface Props {
  slug: string;
  project: Project;
  content?: string;
}

const Project: React.FC<Props> = ({ slug, project, content }) => {
  const {
    launchDate: launchDateStr,
    screenshot: {
      childImageSharp: {
        fluid: { srcSet = undefined, src = undefined } = {},
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
                style={project.primaryColor && {
                  backgroundColor: `rgb(${project.primaryColor.join(', ')})`,
                }}
              >
                {launchDate
                  ? `${monthNames[launchDate.getMonth() - 1]} ${launchDate.getFullYear()}` // eslint-disable-line max-len
                  : 'TBA'}
              </span>
              <ExternalLink href={project.link}>{project.link}</ExternalLink>
            </p>

            <div className='row'>
              { project.technologies && project.technologies.length > 0 && (
                <div className={styles.technologies}>
                  <p><strong>Technologies</strong></p>
                  <ul>
                    { project.technologies.map((key) => {
                      const tech = getTechnology(key);
                      if (!tech) return null;
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
              ) }

              { project.hosting && project.hosting.length > 0 && (
                <div className={styles.hosting}>
                  <p><strong>Hosting</strong></p>
                  <ul>
                    { project.hosting.map((key) => {
                      const item = getHosting(key);
                      if (!item) return null;
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
              ) }
            </div>

            { content && (
              <CaptureLinks
                className='body'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) }

          </div>

          <div className={styles.screenshot}>
            <ExternalLink href={project.link}>
              <Screen url={project.link} color={project.primaryColor}>
                <img
                  src={src}
                  srcSet={srcSet}
                  sizes='(min-width: 1200px) 452px, (min-width: 992px) 369px, (min-width: 768px) 277px, calc(100vw - 40px)' // eslint-disable-line max-len
                  alt={project.name}
                />
              </Screen>
            </ExternalLink>
          </div>

        </div>

      </div>

    </article>
  );
};

export default Project;
