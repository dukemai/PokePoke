import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const propTypes = {};
const defaultProps = {};
const steps = [...new Array(20).keys()].map(k => ({
  ingredient: `strIngredient${k}`,
  measure: `strMeasure${k}`,
}));

const buildEmbedLink = link =>
  `https://www.youtube.com/embed/${link.replace(/http[?]+\?v=/, '')}`;

const Recipe = ({ idMeal }) => {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const mealsObject = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        ).then(res => res.json());

        const { meals } = mealsObject;
        setMeal(meals[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (typeof fetch !== 'undefined') {
      fetchMeal();
    }
  }, [idMeal]);
  const computedSteps = steps
    .filter(s => Boolean(meal[s.ingredient]))
    .map(s => ({
      ingredient: meal[s.ingredient],
      measure: meal[s.measure],
    }));
  return (
    <section className="recipe">
      <h4>{meal.strMeal}</h4>
      <p>
        <span className="recipe__label label secondary">
          <i className="fi fi-folder" />
          {meal.strCategory}
        </span>
        <span className="recipe__label label secondary">
          <i className="fi fi-share" />
          {meal.strArea}
        </span>
      </p>
      <p>{meal.strInstructions}</p>
      <h5>Recipe</h5>
      <table className="recipe__table">
        <thead>
          <tr>
            <th width="200">Igredient</th>
            <th>Measure</th>
          </tr>
        </thead>
        <tbody>
          {computedSteps.map((s, key) => (
            <tr key={key}>
              <td>{s.ingredient}</td>
              <td>{s.measure}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Boolean(meal.strYoutube) && (
        <>
          <h5>Video</h5>
          <iframe
            width="100%"
            height="56.25%"
            src={buildEmbedLink(meal.strYoutube)}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      )}
    </section>
  );
};
Recipe.propTypes = propTypes;
Recipe.defaultProps = defaultProps;
export default Recipe;
