import React from 'react';
import { monthNames } from '../../../../../../data';


const Project = ({slug, project}) => {
  const ProjectLink = ({ children }) => <a href={project.link} target='_blank'>{children}</a>
  return (
    <article className='project' id={slug} style={{backgroundColor: `rgba(${project.primaryColor.join(', ')}, .05)`}}>

      <div className='container'>

        <div className='row'>

          <div className='content'>

            <h3>{ project.name }</h3>

            <p><ProjectLink>{project.link}</ProjectLink></p>

            <p>Launch Date: {project.launchDate ? `${monthNames[project.launchDate.getMonth() - 1]} ${project.launchDate.getFullYear()}` : 'TBA'}</p>

            <div className='body' dangerouslySetInnerHTML={{__html: require(`../../../../../../data/content/development/projects/${slug}.md`)}}/>

          </div>

          <div className='screenshot'>
            <ProjectLink>
              <img src={require(`../../../../../images/${project.screenshot}`)}/>
            </ProjectLink>
          </div>

        </div>

      </div>

    </article>
  );
}

export default Project;
