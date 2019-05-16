import React from 'react';

const AppContext = React.createContext({
  meal: null,
  meals: [],
  selected: [],
  filterBySelected: false,
  nextMeal: () => {},
});
export default AppContext;
