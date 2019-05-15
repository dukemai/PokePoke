import React, { useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import AppContext from '../../AppContext';
import Recipe from './_Recipe';

const propTypes = {};
const defaultProps = {};
const Footer = ({ onWantClicked, onNextClicked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenClicked = () => setIsOpen(!isOpen);
  const onCloseClicked = () => setIsOpen(false);
  const state = useContext(AppContext);
  return (
    <section className="footer">
      <div
        className={classnames(
          'off-canvas mobile-action-sheet off-canvas-absolute position-bottom',
          {
            'is-open': isOpen,
          }
        )}
      >
        <div className="mobile-action-sheet-inner">
          <button
            className="button action-sheet-toggle"
            type="button"
            onClick={onOpenClicked}
          >
            Recipe
          </button>

          <button
            className="close-button"
            aria-label="Close menu"
            type="button"
            onClick={onCloseClicked}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {state.meal.idMeal && <Recipe idMeal={state.meal.idMeal} />}
        </div>
      </div>
      <div className="mobile-bottom-bar">
        <button onClick={onWantClicked} className="footer-link">
          <span className="footer-text footer-text--want">Want</span>
        </button>
        <button onClick={onNextClicked} className="footer-link">
          <span className="footer-text footer-text--next">Don't want</span>
        </button>
      </div>
    </section>
  );
};
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;
export default Footer;
