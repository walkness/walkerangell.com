/* globals window document requestAnimationFrame */

import React, { Component } from 'react';
import {
  graphql,
  Link,
  PageProps,
  navigate,
} from 'gatsby';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { throttle } from 'lodash';

import { TypekitLoadedContext } from '@/context/typekit_loaded_context';
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

const scrollToPosition = (
  position: number,
  scrollDuration = 200,
  finished: () => void = () => undefined,
) => {
  const docHeight = documentHeight();
  const positionOrBottom = Math.min(position, docHeight - window.innerHeight);
  const scrollHeight = window.scrollY;
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = (positionOrBottom - scrollHeight) / 2;
  const numIterations = Math.ceil(scrollDuration / 15);
  let scrollCount = 0;
  let scrollMargin: number;
  function step() {
    setTimeout(() => {
      if (scrollCount < numIterations) {
        requestAnimationFrame(step);
        scrollCount += 1;
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

type LocationProp = PageProps['location']

interface LocationWithUserScroll extends LocationProp {
  state: { userScroll: boolean };
}

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
                fluid: { srcSet: string; src: string; };
              };
            };
          };
          html: string;
        };
      }[];
    };
  };
  location: LocationWithUserScroll;
}

interface State {
  inProjects: boolean;
}

type Context = React.ContextType<typeof TypekitLoadedContext>

class Development extends Component<Props, State, Context> {
  static contextType = TypekitLoadedContext;

  readonly state: State = { inProjects: false };

  private projects = React.createRef<HTMLDivElement>();

  private projectsHeader = React.createRef<HTMLDivElement>();

  private animatingScroll = false;

  private mounted = false;

  private boundScrollHandler?: () => void;

  private boundResizeHandler?: () => void;

  private projectsHeaderHeight?: number;

  private projectOffsets: { start: number; end: number; id: string; }[] = [];

  private prevContext?: Context;

  componentDidMount(): void {
    const { location } = this.props;
    this.setProjectOffsets();
    setTimeout(() => this.setProjectOffsets(), 500);
    this.handleScroll();
    this.boundScrollHandler = throttle(this.handleScroll.bind(this), 100);
    this.boundResizeHandler = throttle(this.handleResize.bind(this), 500);
    window.addEventListener('scroll', this.boundScrollHandler);
    window.addEventListener('resize', this.boundResizeHandler);
    if (location.hash && window.scrollY === 0) {
      this.scrollToAnchor(location.hash.substring(1));
    }
    setTimeout(() => { this.mounted = true; }, 5);

    this.prevContext = this.context;
  }

  componentDidUpdate(prevProps: Props): void {
    const { location } = this.props;

    if (this.context && this.prevContext !== this.context) {
      this.setProjectOffsets();
      this.handleScroll();
    }

    if (
      !(location.state && location.state.userScroll)
      && location.hash
      && prevProps.location.hash !== location.hash
    ) {
      this.scrollToAnchor(location.hash.substring(1), true);
    }

    this.prevContext = this.context;
  }

  componentWillUnmount(): void {
    if (this.boundScrollHandler) window.removeEventListener('scroll', this.boundScrollHandler);
    if (this.boundResizeHandler) window.removeEventListener('resize', this.boundResizeHandler);
  }

  setProjectOffsets(): void {
    const { current: projectsHeader } = this.projectsHeader;
    const { current: projects } = this.projects;
    if (!projectsHeader || !projects) return;
    const projectsHeaderRect = projectsHeader.getBoundingClientRect();
    this.projectsHeaderHeight = projectsHeaderRect.height;
    this.projectOffsets = [];
    Array.from(projects.getElementsByTagName('article')).forEach((el) => {
      const rect = el.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      this.projectOffsets.push({
        start: start - (this.projectsHeaderHeight || 0),
        end: start + rect.height,
        id: el.id,
      });
    });
  }

  handleResize(): void {
    this.setProjectOffsets();
  }

  handleScroll(): void {
    const { location } = this.props;
    const { inProjects: currentInProjects } = this.state;

    const scroll = window.scrollY;

    const inProjects = scroll >= this.projectOffsets[0].start;
    if (inProjects !== currentInProjects) {
      this.setState({ inProjects });
    }

    if (!this.animatingScroll && this.mounted) {
      let hash = '';
      this.projectOffsets.forEach((el) => {
        if (scroll >= el.start && scroll < el.end) {
          hash = `#${el.id}`;
        }
      });
      if (hash !== location.hash) {
        navigate(location.pathname + hash, {
          state: { userScroll: true },
          replace: true,
        });
      }
    }
  }

  scrollToAnchor(a: string, animate = false): void {
    const element = document.getElementById(a);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = (rect.top + window.scrollY) - (this.projectsHeaderHeight || 0);
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
    projectsFiles: allFile(
      filter: {
        relativeDirectory: {eq: "content/development/projects"},
        childMarkdownRemark: {frontmatter: {hidden: {ne: true}}},
      },
      sort: {fields: childMarkdownRemark___frontmatter___order},
    ) {
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
                fluid(maxWidth: 455, srcSetBreakpoints: [455, 910, 1365], jpegQuality: 80) {
                  srcSet
                  src
                }
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
