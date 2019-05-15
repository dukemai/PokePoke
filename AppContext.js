import React from 'react';

const AppContext = React.createContext({
  meal: null,
  meals: [],
  selected: [],
  nextMeal: () => {},
});
export default AppContext;
