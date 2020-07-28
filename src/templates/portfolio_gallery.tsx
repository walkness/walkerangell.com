/* globals document requestAnimationFrame */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, PageProps, navigate } from 'gatsby';
import classNames from 'classnames';

import NavLink from '@/components/nav_link';
import LazyImg from '@/components/lazy_img';

import styles from './portfolio_gallery.module.scss';

interface Props extends PageProps {
  data: {
    category: {
      slug: string;
      title: string;
    };
    gallery: {
      slug: string;
      title: string;
    };
    imagesEdge: {
      nodes: {
        name: string;
        childImageSharp: {
          thumb: {
            base64: string;
          };
          image: {
            src: string;
            srcSet: string;
          };
        };
      }[];
    };
  };
  pageContext: {
    category: string;
    gallery: string;
  };
}

interface State {
  loaded: string[];
}

class Gallery extends Component<Props, State> {
  readonly state: State = { loaded: [] };

  private panel = React.createRef<HTMLUListElement>();

  private filmstrip = React.createRef<HTMLUListElement>();

  componentWillMount(): void {
    const { location, data: { imagesEdge: { nodes: images } } } = this.props;
    const hash = location.hash.substring(1);
    if (!hash || !images.some((img) => img.name === hash)) {
      navigate(`${location.pathname}#${images[0].name}`, { replace: true });
    }
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPress);
    const { loaded } = this.state;
    const { current: panel } = this.panel;
    if (!panel) return;

    const imgs = Array.from(panel.getElementsByTagName('img')) as HTMLImageElement[];

    imgs.forEach((img) => {
      const key = img.dataset.imagekey;
      if (key && img.complete && loaded.indexOf(key) === -1) {
        loaded.push(key);
      }
    });
    this.scrollFilmstrip();
    this.setState({ loaded }); // eslint-disable-line react/no-did-mount-set-state
  }

  componentDidUpdate(prevProps: Props): void {
    const { location } = this.props;
    if (prevProps.location.hash !== location.hash) {
      this.scrollFilmstrip();
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  advanceImage = (i: number): void => {
    const { location, data: { imagesEdge: { nodes: imageFiles } } } = this.props;
    const numImages = imageFiles.length;
    const current = location.hash.substring(1);
    const currentIndex = imageFiles.findIndex((img) => img.name === current);
    const nextIndex = (((currentIndex + i) % numImages) + numImages) % numImages;
    navigate(`${location.pathname}#${imageFiles[nextIndex].name}`, { replace: true });
  }

  handleKeyPress: React.KeyboardEventHandler = (e) => {
    if (e.which === 37) {
      this.advanceImage(-1);
    } else if (e.which === 39) {
      this.advanceImage(1);
    }
  }

  handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const name = e.currentTarget.dataset.imagekey;
    if (!name) return;
    this.setState((state) => ({ loaded: [...state.loaded, name] }));
  }

  scrollFilmstrip(): void {
    const { current: filmstrip } = this.filmstrip;
    if (!filmstrip) return;
    const filmstripWidth = filmstrip.getBoundingClientRect().width;
    const currentImage = filmstrip.getElementsByClassName('current')[0] as HTMLImageElement | undefined;
    if (!currentImage) return;
    const left = currentImage.offsetLeft;
    const currentImageWidth = currentImage.offsetWidth;
    const center = left + (currentImageWidth / 2);
    const filmstripCenter = filmstripWidth / 2;
    const scroll = Math.max(Math.round(center - filmstripCenter), 0);
    if (scroll !== filmstrip.scrollLeft) {
      this.scrollFilmstripWithOffset(scroll);
    }
  }

  scrollFilmstripWithOffset(
    offset: number,
    scrollDuration = 200,
    finished = () => undefined,
  ): void {
    const { current: element } = this.filmstrip;
    if (!element) return;
    const scrollWidth = element.scrollLeft;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = (offset - scrollWidth) / 2;
    const numIterations = Math.ceil(scrollDuration / 15);
    let scrollCount = 0;
    let scrollMargin;
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
          if (element) element.scrollLeft = scrollMargin + scrollWidth;
        } else {
          finished();
        }
      }, 15);
    }
    requestAnimationFrame(step);
  }

  render(): React.ReactNode {
    const { data, location } = this.props;
    const { category, gallery, imagesEdge } = data;
    const { nodes: imageFiles } = imagesEdge;

    let current = location.hash.substring(1);
    if (!current || imageFiles.findIndex((img) => img.name === current) === -1) {
      current = imageFiles[0]?.name;
    }
    const { loaded } = this.state;
    return (
      <div className={`gallery centered-vertically centered-horizontally ${styles.gallery}`}>

        <Helmet title={`${gallery.title} | ${category.title}`} />

        <div className='container'>
          <ol className={`breadcrumb ${styles.breadcrumb}`}>

            <NavLink
              liClassName='breadcrumb-item'
              to={`/photography/${category.slug}/`}
            >
              {category.title}
            </NavLink>

            <NavLink
              liClassName='breadcrumb-item'
              to={`/photography/${category.slug}/${gallery.slug}/`}
              noLinkActive
            >
              {gallery.title}
            </NavLink>

          </ol>
        </div>

        <ul ref={this.panel} className={styles.panel}>

          { imageFiles.map((imageFile) => {
            const { name, childImageSharp: { image } } = imageFile;
            return (
              <li
                key={name}
                className={classNames(styles.galleryImage, { current: current === name })}
              >
                <LazyImg
                  onLoad={this.handleImageLoad}
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes='(min-width: 769px) calc(100vw - 291px), 100vw'
                  alt={name}
                  data-imagekey={name}
                />
              </li>
            );
          }) }

          <button
            type='button'
            className={styles.next}
            onClick={() => this.advanceImage(1)}
          >
            Next
          </button>

          <button
            type='button'
            className={styles.previous}
            onClick={() => this.advanceImage(-1)}
          >
            Previous
          </button>

        </ul>

        <ul className={styles.filmstrip} ref={this.filmstrip}>

          { imageFiles.map((imageFile) => {
            const { name, childImageSharp: { thumb, image } } = imageFile;
            return (
              <li
                key={name}
                className={classNames(styles.galleryImage, { current: current === name })}
                onClick={() => navigate(`${location.pathname}#${name}`)}
              >
                { loaded.indexOf(name) === -1
                  ? <LazyImg src={thumb.base64} className='placeholder' />
                  : (
                    <LazyImg
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes='(min-width: 769px) calc(100vw - 291px), 100vw'
                    />
                  ) }
              </li>
            );
          }) }

        </ul>

      </div>
    );
  }
}

export const pageQuery = graphql`
  query ($category: String!, $gallery: String!, $imagesDir: String!) {
    category: portfolioCategoriesJson(slug: {eq: $category}) {
      slug
      title
    }
    gallery: portfolioGalleriesJson(category: {eq: $category}, slug: {eq: $gallery}) {
      slug
      title
    }
    imagesEdge: allFile(filter: {relativeDirectory: {eq: $imagesDir}}, sort: {fields: name}) {
      nodes {
        name
        childImageSharp {
          thumb: fluid(maxWidth: 50, maxHeight: 50, fit: INSIDE, grayscale: true) {
            base64
          }
          image: fluid(maxWidth: 1640, maxHeight: 1640, fit: INSIDE, srcSetBreakpoints: [830, 3280]) {
            src
            srcSet
          }
        }
      }
    }
  }
`;

export default Gallery;
