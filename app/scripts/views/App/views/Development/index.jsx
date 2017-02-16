/* globals window document requestAnimationFrame */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { routerShape, locationShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { development } from '../../../../../../data';
import PageHeader from '../../components/PageHeader';
import CaptureLinks from '../../components/CaptureLinks';
import Project from './Project';


const documentHeight = () => {
  const body = document.body;
  const html = document.documentElement;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};


const scrollToPosition = (position, scrollDuration = 200, finished = () => {}) => {
  const docHeight = documentHeight();
  const positionOrBottom = Math.min(position, docHeight - window.innerHeight);
  const scrollHeight = window.scrollY;
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = (positionOrBottom - scrollHeight) / 2;
  const numIterations = Math.ceil(scrollDuration / 15, 1);
  let scrollCount = 0;
  let scrollMargin;
  function step() {
    setTimeout(function () {  // eslint-disable-line prefer-arrow-callback
      if (scrollCount < numIterations) {
        requestAnimationFrame(step);
        scrollCount++;
        if (scrollCount === numIterations) {
          scrollMargin = cosParameter * 2;
        } else {
          scrollMargin = cosParameter - (cosParameter * Math.cos(scrollCount * scrollStep));
        }
        window.scrollTo(0, (scrollMargin + scrollHeight));
      } else {
        finished();
      }
    }, 15);
  }
  requestAnimationFrame(step);
};


class Development extends Component {

  static propTypes = {
    location: locationShape.isRequired,
  };

  static contextTypes = {
    router: routerShape.isRequired,
    typekitLoaded: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.animatingScroll = false;
    this.mounted = false;
    this.state = {
      inProjects: false,
    };
  }

  componentDidMount() {
    this.setProjectOffsets();
    setTimeout(() => this.setProjectOffsets(), 500);
    this.handleScroll();
    this.boundScrollHandler = this.handleScroll.bind(this);
    this.boundResizeHandler = this.handleResize.bind(this);
    window.addEventListener('scroll', this.boundScrollHandler);
    window.addEventListener('resize', this.boundResizeHandler);
    if (this.props.location.hash && window.scrollY === 0) {
      this.scrollToAnchor(this.props.location.hash.substring(1));
    }
    setTimeout(() => { this.mounted = true; }, 5);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.typekitLoaded && nextContext.typekitLoaded !== this.context.typekitLoaded) {
      this.setProjectOffsets();
      this.handleScroll();
    }

    if (
      !(nextProps.location.state && nextProps.location.state.userScroll) &&
      nextProps.location.hash &&
      nextProps.location.hash !== this.props.location.hash
    ) {
      this.scrollToAnchor(nextProps.location.hash.substring(1), true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.boundScrollHandler);
    window.removeEventListener('resize', this.boundResizeHandler);
  }

  setProjectOffsets() {
    const projectsHeaderRect = this.projectsHeader.getBoundingClientRect();
    this.projectsHeaderHeight = projectsHeaderRect.height;
    this.projectOffsets = [];
    Array.from(this.projects.getElementsByTagName('article')).forEach(el => {
      const rect = el.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      this.projectOffsets.push({
        start: start - this.projectsHeaderHeight,
        end: start + rect.height,
        id: el.id,
      });
    });
  }

  handleResize() {
    this.setProjectOffsets();
  }

  handleScroll() {
    const scroll = window.scrollY;

    const inProjects = scroll >= this.projectOffsets[0].start;
    if (inProjects !== this.state.inProjects) {
      this.setState({ inProjects });
    }

    if (!this.animatingScroll && this.mounted) {
      let hash = '';
      this.projectOffsets.forEach(el => {
        if (scroll >= el.start && scroll < el.end) {
          hash = `#${el.id}`;
        }
      });
      if (hash !== this.props.location.hash) {
        this.context.router.replace(Object.assign({}, this.props.location, {
          hash,
          state: { userScroll: true },
        }));
      }
    }
  }

  scrollToAnchor(a, animate = false) {
    const element = document.getElementById(a);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = (rect.top + window.scrollY) - this.projectsHeaderHeight;
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

  render() {
    return (
      <div id='development-list'>

        <Helmet title={development.sectionTitle} />

        <div className='container'>

          <PageHeader title={development.sectionTitle} />

          <CaptureLinks
            className='body'
            dangerouslySetInnerHTML={{ __html: require('../../../../../../data/content/development/index.md') }}  // eslint-disable-line global-require, max-len
          />
        </div>

        <section ref={c => { this.projects = c; }} className='projects'>

          <div
            ref={c => { this.projectsHeader = c; }}
            className={classNames(
              'projects-header',
              { fixed: this.state.inProjects },
            )}
          >

            <div className='container'>

              <h2>Projects</h2>

              <ul className='nav nav-pills'>
                {Object.keys(development.projects).map(slug => {
                  const project = development.projects[slug];
                  return (
                    <li
                      key={slug}
                      className={classNames('nav-item', {
                        active: slug === this.props.location.hash.substring(1),
                      })}
                    >
                      <Link
                        className={classNames('nav-link', {
                          active: slug === this.props.location.hash.substring(1),
                        })}
                        to={Object.assign({}, this.props.location, {
                          hash: `#${slug}`,
                          state: { userScroll: false },
                        })}
                      >
                        {project.shortName || project.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>

          </div>

          <div className='projects-header-spacer'>&nbsp;</div>

          { Object.keys(development.projects).map(slug => (
            <Project key={slug} slug={slug} project={development.projects[slug]} />
          )) }

        </section>

      </div>
    );
  }
}

export default Development;
