import React from 'react';


const Project = ({slug, project}) => {
  const ProjectLink = ({ children }) => <a href={project.link} target='_blank'>{children}</a>
  return (
    <article className='project' id={slug}>

      <div className='container'>

        <div className='row'>

          <div className='content'>

            <h2>{ project.name }</h2>

            <p><ProjectLink>{project.link}</ProjectLink></p>

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
