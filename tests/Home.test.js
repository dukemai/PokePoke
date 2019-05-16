import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer'; // ES6
import {
  render,
  fireEvent,
  waitForElement,
  act,
  cleanup,
} from 'react-testing-library';
import nock from 'nock';
import fetch from 'node-fetch';

import Home from '../pages/index';
import Meal from '../components/Home/Meal';

describe('test rendering Home', () => {
  afterEach(cleanup);

  beforeEach(() => {
    const meals = {
      meals: [
        {
          strMeal: 'meal 1',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52874',
        },
        {
          strMeal: 'meal 2',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52875',
        },
        {
          strMeal: 'meal 3',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
          idMeal: '52876',
        },
      ],
    };
    global.fetch = fetch;
    nock('https://www.themealdb.com/api/json/v1/1/filter.php')
      .get('')
      .query(true)
      .times(Infinity)
      .reply(200, meals);
    nock('https://api.myjson.com/bins/1gldhe')
      .get('')
      .times(Infinity)
      .reply(200, { selected: [] });
  });
  test('Rendering Home and it requests to get meals and favorit list', async () => {
    const { getByText } = render(<Home />);
    const el = await waitForElement(() => getByText('meal 1'));
    expect(el).toBeInTheDocument();
  });
  test('Rendering then click on want. That item should be added to selected', () => {});
  test('Rendering then click on dont want. Show the next item', () => {});
  test('Rendering then click on want then click on dont want. That item should be not added to the selected', () => {});
  test('Rendering then click on next. The next item should show', () => {});
  test('Rendering then click on previous. The previous item should show', () => {});
});
