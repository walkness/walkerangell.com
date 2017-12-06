import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.scss';


const SubmitButton = (props) => {
  const { isSubmitting, size } = props;
  return (
    <button
      type={props.type}
      className={classNames(
        'btn',
        `btn${props.outline ? '-outline' : ''}-${props.style}`,
        props.className, {
          'is-loading': isSubmitting,
          [`btn-${size}`]: !!size,
        },
      )}
      disabled={!props.enabled || isSubmitting}
      onClick={props.onClick}
    >

      <span className='loader-icon' styleName='loader-icon' />

      { props.children || props.label }

    </button>
  );
};

SubmitButton.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
  outline: PropTypes.bool,
  enabled: PropTypes.bool,
  label: PropTypes.string,
  isSubmitting: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
};

SubmitButton.defaultProps = {
  type: 'submit',
  style: 'primary',
  outline: false,
  enabled: true,
  label: 'Submit',
  isSubmitting: false,
  className: '',
  onClick: () => {},
};

export default SubmitButton;
