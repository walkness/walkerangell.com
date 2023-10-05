import React, { Component } from 'react';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';

import styles from './background_image.module.scss';

interface Props {
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

interface State {
  loaded: boolean;
}

const imgQuery = graphql`
  query {
    file(relativePath: {eq: "home/Iceland-5497.jpg"}) {
      childImageSharp {
        original { src }
        crop750x1334: fixed(width: 750, height: 1334) { src }
        crop1536x2048: fixed(width: 1536, height: 2048) { src }
        crop1242x2208: fixed(width: 1242, height: 2208) { src }
        x800: fluid(maxHeight: 800) { src }
        x1200: fluid(maxHeight: 1200) { src }
        x1600: fluid(maxHeight: 1600) { src }
        x2000: fluid(maxHeight: 2000) { src }
        x2400: fluid(maxHeight: 2400) { src }
        x2800: fluid(maxHeight: 2800) { src }
        x3200: fluid(maxHeight: 3200) { src }
      }
    }
  }
`;

interface ImageQueryData {
  file: {
    childImageSharp: {
      original: { src: string; };
      crop750x1334: { src: string; };
      crop1536x2048: { src: string; };
      crop1242x2208: { src: string; };
      x800: { src: string; };
      x1200: { src: string; };
      x1600: { src: string; };
      x2000: { src: string; };
      x2400: { src: string; };
      x2800: { src: string; };
      x3200: { src: string; };
    };
  };
}

interface PictureProps extends Props {
  imgRef: React.Ref<HTMLImageElement>;
}

const Picture: React.FC<PictureProps> = ({ imgRef, onLoad }) => {
  const data = useStaticQuery(imgQuery);
  return (
    <picture
      style={{ display: 'none' }}
      className='dummy'
    >

      <source
        srcSet={data.file.childImageSharp.crop750x1334.src}
        media='(max-width: 400px) and (max-height: 700px) and (orientation: portrait) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.crop1536x2048.src}
        media='(max-width: 768px) and (max-height: 1024px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 512px) and (max-height: 683px) and (orientation: portrait) and (max-resolution: 3.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.crop1242x2208.src}
        media='(max-width: 900px) and (max-height: 1560px) and (orientation: portrait) and (max-resolution: 2.5dppx), (max-width: 450px) and (max-height: 780px) and (orientation: portrait) and (max-resolution: 3.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x800.src}
        media='(max-height: 800px) and (max-resolution: 1.5dppx), (max-height: 400px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x1200.src}
        media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 600px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x1600.src}
        media='(max-height: 1600px) and (max-resolution: 1.5dppx), (max-height: 800px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x2000.src}
        media='(max-height: 2000px) and (max-resolution: 1.5dppx), (max-height: 1000px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x2400.src}
        media='(max-height: 1200px) and (max-resolution: 1.5dppx), (max-height: 1200px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x2800.src}
        media='(max-height: 2800px) and (max-resolution: 1.5dppx), (max-height: 1440px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <source
        srcSet={data.file.childImageSharp.x3200.src}
        media='(max-height: 3200px) and (max-resolution: 1.5dppx), (max-height: 1600px) and (max-resolution: 2.5dppx)' // eslint-disable-line max-len
      />

      <img
        ref={imgRef}
        onLoad={onLoad}
        src={data.file.childImageSharp.original.src}
        role='presentation'
      />

    </picture>
  );
};

class BackgroundImage extends Component<Props, State> {
  readonly state: State = { loaded: false };

  private img = React.createRef<HTMLImageElement>();

  componentDidMount(): void {
    const { current: img } = this.img;
    if (img && img.complete) {
      this.setState({ loaded: true }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  handleLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const { onLoad } = this.props;
    this.setState({ loaded: true });
    if (onLoad) onLoad(e);
  }

  render(): React.ReactNode {
    const { loaded } = this.state;
    const { current: img } = this.img;
    const imgSrc = img && (img.currentSrc || img.src);
    return (
      <div className={classNames(styles.backgroundImageWrapper, { loaded })}>

        <div className={styles.background} />

        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: loaded && this.img ? `url(${imgSrc})` : 'none',
          }}
        />

        <Picture imgRef={this.img} onLoad={this.handleLoad} />

        <div className={styles.placeholder} />

      </div>
    );
  }
}

export default BackgroundImage;
