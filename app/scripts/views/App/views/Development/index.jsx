import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';

import { development } from '../../../../../../data';
import PageHeader from '../../components/PageHeader';
import Project from './Project';


const documentHeight = () => {
  const body = document.body;
  const html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}


const scrollToPosition = (position, scrollDuration=200, finished=()=>{}) => {
  const docHeight = documentHeight()
  const positionOrBottom = Math.min(position, docHeight - window.innerHeight);
  const scrollHeight = window.scrollY;
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = (positionOrBottom - scrollHeight) / 2;
  const numIterations = Math.ceil(scrollDuration / 15, 1);
  let scrollCount = 0;
  let scrollMargin;
  requestAnimationFrame(step);
  function step() {
    setTimeout(function() {
      if (scrollCount < numIterations) {
        requestAnimationFrame(step);
        scrollCount++;
        if (scrollCount === numIterations)
          scrollMargin = cosParameter * 2;
        else
          scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, (scrollMargin + scrollHeight));
      } else {
        finished();
      }
    }, 15);
  }
}


class Development extends Component {

  static contextTypes = {
    router: routerShape.isRequired,
    typekitLoaded: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.animatingScroll = false;
    this.state = {
      inProjects: false,
    };
  }

  componentDidMount() {
    this.setProjectOffsets();
    this.handleScroll();
    this.boundScrollHandler = this.handleScroll.bind(this);
    this.boundResizeHandler = this.handleResize.bind(this);
    window.addEventListener('scroll', this.boundScrollHandler);
    window.addEventListener('resize', this.boundResizeHandler);
    if (this.props.location.hash && window.scrollY === 0)
      this.scrollToAnchor(this.props.location.hash.substring(1));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.typekitLoaded && nextContext.typekitLoaded !== this.context.typekitLoaded) {
      this.setProjectOffsets();
      this.handleScroll();
    }

    if (!(nextProps.location.state && nextProps.location.state.userScroll) && nextProps.location.hash && nextProps.location.hash !== this.props.location.hash)
      this.scrollToAnchor(nextProps.location.hash.substring(1), true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundScrollHandler);
    window.removeEventListener('resize', this.boundResizeHandler);
  }

  scrollToAnchor(a, animate=false) {
    const element = document.getElementById(a);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = rect.top + window.scrollY - this.projectsHeaderHeight;
      if (animate) {
        this.animatingScroll = true;
        scrollToPosition(offset, 200, () => {
          this.animatingScroll = false;
        });
      } else {
        window.scrollTo(0, offset);
      }
    }
  }

  handleScroll(e) {
    const scroll = window.scrollY;

    const inProjects = scroll >= this.projectsStart;
    if (inProjects !== this.state.inProjects)
      this.setState({inProjects: inProjects});

    if (!this.animatingScroll) {
      let hash = '';
      for (const el of this.projectOffsets) {
        if (scroll >= el.start && scroll < el.end)
          hash = `#${el.id}`;
      }
      if (hash !== this.props.location.hash) {
        this.context.router.push(Object.assign({}, this.props.location, {
          hash: hash,
          state: {userScroll: true},
        }));
      }
    }
  }

  handleResize(e) {
    this.setProjectOffsets();
  }

  setProjectOffsets() {
    const projectsHeaderRect = this.refs.projectsHeader.getBoundingClientRect();
    this.projectsStart = projectsHeaderRect.top + window.scrollY;
    this.projectsHeaderHeight = projectsHeaderRect.height;
    this.projectOffsets = [];
    for (const el of this.refs.projects.getElementsByTagName('article')) {
      const rect = el.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      this.projectOffsets.push({
        start: start - this.projectsHeaderHeight,
        end: start + rect.height,
        id: el.id,
      });
    }
  }

  render() {
    return (
      <div id='development-list'>

        <Helmet title={development.sectionTitle}/>

        <div className='container'>

          <PageHeader title={development.sectionTitle}/>

          <div className='body' dangerouslySetInnerHTML={{__html: require('../../../../../../data/content/development/index.md')}}/>
        </div>

        <section ref='projects' className='projects'>

          <div ref='projectsHeader' className={`projects-header${ this.state.inProjects ? ' fixed' : '' }`}>

            <div className='container'>
              
              <h2>Projects</h2>

              <ul className='nav nav-pills'>
                {Object.keys(development.projects).map(slug => {
                  const project = development.projects[slug];
                  return (
                    <li key={slug} className={slug === this.props.location.hash.substring(1) ? 'active' : ''}>
                      <Link to={Object.assign({}, this.props.location, {hash: `#${slug}`, state: {userScroll: false}})}>
                        {project.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>

            </div>

          </div>

          <div className='projects-header-spacer'>&nbsp;</div>

        { Object.keys(development.projects).map(slug => {
          return <Project key={slug} slug={slug} project={development.projects[slug]}/>
        }) }
        </section>

      </div>
    );
  }
}

export default Development;
