import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../AppContext';

const propTypes = {};
const defaultProps = {};
const Meal = ({ meal }) => {
  const state = useContext(AppContext);
  const isSelected = meal.idMeal && state.selected.includes(meal.idMeal);
  return (
    <div className="card card--meal">
      <div className="card-image__holder flex-container align-center">
        {isSelected && <i className="fi-check" />}
        <img src={meal.strMealThumb} />
      </div>
      <div className="card-section">
        <h4>{meal.strMeal ? meal.strMeal : 'Loading...'}</h4>
      </div>
    </div>
  );
};
Meal.propTypes = propTypes;
Meal.defaultProps = defaultProps;
export default Meal;
