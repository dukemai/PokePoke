import React, { useState, useEffect } from 'react';
import { flatMap } from 'lodash/fp';
import classnames from 'classnames';

import Meal from '../components/Home/Meal';
import Footer from '../components/Home/Footer';
import AppContext from '../AppContext';

const JSON_LINK = 'https://api.myjson.com/bins/1gldhe';
const categories = ['Beef', 'Seafood', 'Vegan', 'Vegetarian'];

const saveSelected = selected =>
  fetch(JSON_LINK, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ selected }),
  });

function Home() {
  const [meals, setMeals] = useState([]);
  const [filterBySelected, setFilterBySelected] = useState(false);
  const [meal, setMeal] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsObject = await Promise.all(
        categories.map(cat =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
          ).then(res => res.json())
        )
      );
      const meals = flatMap(m => m.meals, mealsObject);
      setMeals(meals);
      setMeal(meals[0]);
    };
    const fetchSelectd = async () => {
      const { selected } = await fetch(JSON_LINK, {}).then(res => res.json());
      setSelected(selected);
    };
    if (typeof fetch !== 'undefined') {
      fetchMeals();
      fetchSelectd();
    }
  }, []);
  const getFilteredMeals = () =>
    filterBySelected ? meals.filter(m => selected.includes(m.idMeal)) : meals;
  const next = () => {
    const filteredMeals = getFilteredMeals();
    const mealIndex = filteredMeals.indexOf(meal);
    setMeal(filteredMeals[(mealIndex + 1) % filteredMeals.length]);
  };
  const onNextClicked = () => {
    next();
  };
  const onPreviousClicked = () => {
    const filteredMeals = getFilteredMeals();
    const mealIndex = filteredMeals.indexOf(meal);
    const index = mealIndex - 1 < 0 ? filteredMeals.length - 1 : mealIndex - 1;
    setMeal(filteredMeals[index]);
  };
  const onDontWantClicked = () => {
    if (selected.includes(meal.idMeal)) {
      const index = selected.indexOf(meal.idMeal);
      const toUpdate = [...selected];
      toUpdate.splice(index, 1);
      setSelected(toUpdate);
      saveSelected(selected);
    }
  };
  const onWantClicked = () => {
    if (!selected.includes(meal.idMeal)) {
      const toUpdate = [...selected];
      toUpdate.push(meal.idMeal);
      setSelected(toUpdate);
      saveSelected(selected);
    }
    next();
  };
  const onFilterClicked = () => {
    setFilterBySelected(!filterBySelected);
  };
  const filteredMeals = getFilteredMeals();
  if (
    filterBySelected &&
    !filteredMeals.includes(meal) &&
    filteredMeals.length
  ) {
    setMeal(filteredMeals[0]);
  }
  return (
    <AppContext.Provider value={{ meal, meals, setMeal, selected }}>
      <section className="container container--main flex-dir-column flex-container">
        <div className="mobile-nav-bar title-bar cell">
          <div className="title-bar-left" />
          <div className="title-bar-center">
            <span className="title-bar-text">What to eat today?</span>
          </div>
          <div className="title-bar-right">
            <button
              onClick={onFilterClicked}
              className={classnames({
                'filter--disabled': !filterBySelected,
                'filter--enabled': filterBySelected,
              })}
            >
              <i className="fi-check" />
            </button>
          </div>
        </div>
        <section className="cell cell--scroll flex-child-auto grid-x grid-padding-x ">
          <section className="cell flex-container align-center align-middle">
            <Meal
              meal={meal}
              onNextClicked={onNextClicked}
              onPreviousClicked={onPreviousClicked}
            />
          </section>
        </section>
        <Footer
          onNextClicked={onDontWantClicked}
          onWantClicked={onWantClicked}
        />
      </section>
    </AppContext.Provider>
  );
}

export default Home;
