import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';
import { isEmpty } from 'lodash/fp';

import AppContext from '../../AppContext';
import Modal from './_Modal';

const propTypes = {};
const defaultProps = {};
const getPreviousMeal = (meals, meal) =>
  meals.indexOf(meal) > 0
    ? meals[(meals.indexOf(meal) - 1) % meals.length]
    : meals[meals.length - 1];
const getNextMeal = (meals, meal) =>
  meals[(meals.indexOf(meal) + 1) % meals.length];

const getFilteredMeals = state =>
  state.filterBySelected
    ? state.meals.filter(m => state.selected.includes(m.idMeal))
    : state.meals;
const Meal = ({ onNextClicked, onPreviousClicked, showNavigation }) => {
  const state = useContext(AppContext);
  const meal = state.meal;
  const filteredMeals = getFilteredMeals(state);
  let reactSwipeEl;
  const [showImageModal, setShowImageModal] = useState(false);
  const pMeal = getPreviousMeal(filteredMeals, state.meal) || { idMeal: -1 };
  const nMeal = getNextMeal(filteredMeals, state.meal) || { idMeal: 1 };
  const showingMeals = [pMeal, meal, nMeal].map(m => ({
    ...m,
    isSelected: m.idMeal && state.selected.includes(m.idMeal),
  }));
  const transitionEnd = (index, el) => {
    if (index === 0) {
      onPreviousClicked();
    }
    if (index === 2) {
      onNextClicked();
    }
  };
  const onImageClicked = () => setShowImageModal(true);
  const hideImageModal = () => setShowImageModal(false);

  return (
    <div className="card card--meal">
      <div className="card-divider">
        <h4>{meal.strMeal ? meal.strMeal : 'Loading...'}</h4>
      </div>
      {!isEmpty(meal) && (
        <>
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: false, transitionEnd, startSlide: 1 }}
            ref={el => (reactSwipeEl = el)}
          >
            {showingMeals.map(m => (
              <section key={m.idMeal}>
                <div className="card-image__holder flex-container align-center">
                  {m.isSelected && <i className="fi-check" />}
                  <img onClick={onImageClicked} src={m.strMealThumb} />
                </div>
              </section>
            ))}
          </ReactSwipe>
          <div className="card-section align-justify flex-container">
            <button onClick={() => reactSwipeEl.prev()}>
              <i className="fi-previous" />
            </button>
            <button onClick={() => reactSwipeEl.next()}>
              <i className="fi-next" />
            </button>
          </div>
          <Modal showModal={showImageModal} onCloseClicked={hideImageModal} image={meal.strMealThumb} />
        </>
      )}
    </div>
  );
};
Meal.propTypes = propTypes;
Meal.defaultProps = defaultProps;
export default Meal;
