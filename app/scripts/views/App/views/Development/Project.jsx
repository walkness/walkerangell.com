import React from 'react';
import { monthNames, development } from '../../../../../../data';
import Screen from '../../components/Screen';
import CaptureLinks from '../../components/CaptureLinks';


const Project = ({slug, project}) => {
  const ProjectLink = ({ children }) => <a href={project.link} target='_blank'>{children}</a>

  const screen455 = require(`../../../../../images/${project.screenshot}-455x.jpg`);
  const screen910 = require(`../../../../../images/${project.screenshot}-910x.jpg`);
  const screen1365 = require(`../../../../../images/${project.screenshot}-1365x.jpg`);

  return (
    <article
      className='project'
      id={slug}
      style={{
        backgroundColor: `rgba(${project.primaryColor.join(', ')}, .05)`,
        borderBottomColor: `rgba(${project.primaryColor.join(', ')}, .1)`,
      }}>

      <div className='container'>

        <div className='row'>

          <div className='content'>

            <h3>
              { project.name }
            </h3>

            <p>
              <span
                className='label'
                style={{backgroundColor: `rgb(${project.primaryColor.join(', ')})`}}>
                {project.launchDate ? `${monthNames[project.launchDate.getMonth() - 1]} ${project.launchDate.getFullYear()}` : 'TBA'}
              </span>
              <ProjectLink>{project.link}</ProjectLink>
            </p>

            <div className='row'>
            { project.technologies && project.technologies.length > 0 ?
              <div className='technologies'>
                <p><strong>Technologies</strong></p>
                <ul>
                  { project.technologies.map(slug => {
                    const tech = development.technologies[slug];
                    return (
                      <li key={slug}>
                        <a href={tech.link} title={tech.title} target='_blank'>
                          {tech.title}
                        </a>
                      </li>
                    )
                  }) }
                </ul>
              </div>
            : null }

            { project.hosting && project.hosting.length > 0 ?
              <div className='hosting'>
                <p><strong>Hosting</strong></p>
                <ul>
                  { project.hosting.map(slug => {
                    const item = development.hosting[slug];
                    return (
                      <li key={slug}>
                        <a href={item.link} title={item.title} target='_blank'>
                          {item.title}
                        </a>
                      </li>
                    )
                  }) }
                </ul>
              </div>
            : null }
            </div>

            <CaptureLinks className='body' dangerouslySetInnerHTML={{__html: require(`../../../../../../data/content/development/projects/${slug}.md`)}}/>

          </div>

          <div className='screenshot'>
            <ProjectLink>
              <Screen url={project.link} color={project.primaryColor}>
                <img
                  src={screen455}
                  srcSet={`${screen455} 455w, ${screen910} 910w, ${screen1365} 1365w`}
                  sizes='(min-width: 1200px) 452px, (min-width: 992px) 369px, (min-width: 768px) 277px, calc(100vw - 40px)'/>
              </Screen>
            </ProjectLink>
          </div>

        </div>

      </div>

    </article>
  );
}

export default Project;
