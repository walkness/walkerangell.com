import React from 'react';

import styles from './screen.module.scss';

interface DefaultProps {
  url?: string;
  color?: [number, number, number];
}

type Props = Partial<DefaultProps> & DefaultProps

const Screen: React.FC<Props> = ({ url, children, color }) => (
  <div className={styles.screen}>

    <div className={styles.topBar}><div className={styles.url}>{url}</div></div>

    <div className={styles.viewport}>
      { children }
      <div
        className={styles.overlay}
        style={color && { backgroundColor: `rgb(${color.join(', ')})` }}
      />
    </div>

    <div
      className={styles.overlay}
      style={color && { backgroundColor: `rgb(${color.join(', ')})` }}
    />

  </div>
);

Screen.defaultProps = {
  url: '',
  color: [0, 0, 0],
};

export default Screen;
