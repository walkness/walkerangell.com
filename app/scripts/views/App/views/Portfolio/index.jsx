import { PropTypes } from 'react';
import Galleries from './Galleries';
import Gallery from './Gallery';


const Portfolio = ({ children }) => children;

Portfolio.propTypes = {
  children: PropTypes.node,
};

export default Portfolio;
export { Galleries, Gallery };
