/* globals window document requestAnimationFrame */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, PageProps } from 'gatsby';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { throttle } from 'lodash';

import PageHeader from '@/components/page_header';
import CaptureLinks from '@/components/capture_links';
import Project from '@/components/development_project';

import styles from './development.module.scss';

const documentHeight = () => {
  const { body, documentElement: html } = document;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
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
    setTimeout(function () { // eslint-disable-line prefer-arrow-callback
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

interface Props extends PageProps {
  data: {
    file: {
      childMarkdownRemark: {
        frontmatter: {
          title: string;
        };
        html: string;
      };
    };
    projectsFiles: {
      nodes: {
        childMarkdownRemark: {
          frontmatter: {
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
          };
          html: string;
        };
      }[];
    };
  };
}

interface State {
  inProjects: boolean;
}

class Development extends Component<Props, State> {
  readonly state: State = { inProjects: false };

  private projects = React.createRef<HTMLDivElement>();

  private projectsHeader = React.createRef<HTMLDivElement>();

  private animatingScroll = false;

  private mounted = false;

  static contextTypes = {
    typekitLoaded: PropTypes.bool,
  };

  // componentDidMount() {
  //   this.setProjectOffsets();
  //   setTimeout(() => this.setProjectOffsets(), 500);
  //   this.handleScroll();
  //   this.boundScrollHandler = throttle(this.handleScroll.bind(this), 100);
  //   this.boundResizeHandler = throttle(this.handleResize.bind(this), 500);
  //   window.addEventListener('scroll', this.boundScrollHandler);
  //   window.addEventListener('resize', this.boundResizeHandler);
  //   if (this.props.location.hash && window.scrollY === 0) {
  //     this.scrollToAnchor(this.props.location.hash.substring(1));
  //   }
  //   setTimeout(() => { this.mounted = true; }, 5);
  // }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   if (nextContext.typekitLoaded && nextContext.typekitLoaded !== this.context.typekitLoaded) {
  //     this.setProjectOffsets();
  //     this.handleScroll();
  //   }

  //   if (
  //     !(nextProps.location.state && nextProps.location.state.userScroll) &&
  //     nextProps.location.hash &&
  //     nextProps.location.hash !== this.props.location.hash
  //   ) {
  //     this.scrollToAnchor(nextProps.location.hash.substring(1), true);
  //   }
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.boundScrollHandler);
  //   window.removeEventListener('resize', this.boundResizeHandler);
  // }

  // setProjectOffsets() {
  //   const projectsHeaderRect = this.projectsHeader.getBoundingClientRect();
  //   this.projectsHeaderHeight = projectsHeaderRect.height;
  //   this.projectOffsets = [];
  //   Array.from(this.projects.getElementsByTagName('article')).forEach((el) => {
  //     const rect = el.getBoundingClientRect();
  //     const start = rect.top + window.scrollY;
  //     this.projectOffsets.push({
  //       start: start - this.projectsHeaderHeight,
  //       end: start + rect.height,
  //       id: el.id,
  //     });
  //   });
  // }

  // handleResize() {
  //   this.setProjectOffsets();
  // }

  // handleScroll() {
  //   const scroll = window.scrollY;

  //   const inProjects = scroll >= this.projectOffsets[0].start;
  //   if (inProjects !== this.state.inProjects) {
  //     this.setState({ inProjects });
  //   }

  //   if (!this.animatingScroll && this.mounted) {
  //     let hash = '';
  //     this.projectOffsets.forEach((el) => {
  //       if (scroll >= el.start && scroll < el.end) {
  //         hash = `#${el.id}`;
  //       }
  //     });
  //     if (hash !== this.props.location.hash) {
  //       this.context.router.replace(Object.assign({}, this.props.location, {
  //         hash,
  //         state: { userScroll: true },
  //       }));
  //     }
  //   }
  // }

  // scrollToAnchor(a, animate = false) {
  //   const element = document.getElementById(a);
  //   if (element) {
  //     const rect = element.getBoundingClientRect();
  //     const offset = (rect.top + window.scrollY) - this.projectsHeaderHeight;
  //     if (animate) {
  //       this.animatingScroll = true;
  //       scrollToPosition(offset, 200, () => {
  //         this.animatingScroll = false;
  //       });
  //     } else {
  //       window.scrollTo(0, offset);
  //     }
  //   }
  // }

  render(): React.ReactNode {
    const { inProjects } = this.state;
    const { location, data } = this.props;
    const {
      file: { childMarkdownRemark: { frontmatter: { title }, html: content } },
      projectsFiles: { nodes: projectFiles },
    } = data;
    return (
      <div className={styles.developmentList} id='development-list'>

        <Helmet title={title} />

        <div className='container'>

          <PageHeader title={title} />

          <CaptureLinks
            className='body'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <section ref={this.projects} className='projects'>

          <div
            ref={this.projectsHeader}
            className={classNames(styles.projectsHeader, { fixed: inProjects })}
          >

            <div className='container'>

              <h2>Projects</h2>

              <ul className={`nav nav-pills ${styles.nav}`}>
                {projectFiles.map((projectFile) => {
                  const { childMarkdownRemark: { frontmatter: project } } = projectFile;
                  const { slug } = project;
                  return (
                    <li
                      key={slug}
                      className={classNames('nav-item', {
                        active: slug === location.hash.substring(1),
                      })}
                    >
                      <Link
                        className={classNames('nav-link', {
                          active: slug === location.hash.substring(1),
                        })}
                        to={`${location.pathname}#${slug}`}
                      >
                        {project.shortName || project.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>

          </div>

          <div className={styles.projectsHeaderSpacer}>&nbsp;</div>

          { projectFiles.map((projectFile) => {
            const { childMarkdownRemark: { html, frontmatter: project } } = projectFile;
            const { slug } = project;
            return <Project key={slug} slug={slug} project={project} content={html} />;
          }) }

        </section>

      </div>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: {eq: "content/development/index.md"}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
    }
    projectsFiles: allFile(filter: {relativeDirectory: {eq: "content/development/projects"}}) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            path
            slug
            name
            shortName
            link
            screenshot {
              childImageSharp {
                size455: fluid(maxWidth: 455) { src }
                size910: fluid(maxWidth: 910) { src }
                size1365: fluid(maxWidth: 1365) { src }
              }
            }
            launchDate
            primaryColor
            technologies
            hosting
          }
          html
        }
      }
    }
  }
`;

export default Development;
