import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {};
const defaultProps = {};
const Modal = ({ image, title, onCloseClicked, showModal }) => (
  <div
    className={classnames('full reveal-overlay align-middle', {
      'flex-container': showModal,
    })}
  >
    <img src={image} alt={title} />
    <button
      onClick={onCloseClicked}
      className="close-button"
      data-close
      aria-label="Close reveal"
      type="button"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
