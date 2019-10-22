import React from 'react';
import { shallow } from 'enzyme';
import CocktailList from './cocktail-list';

describe('<CocktailList />', () => {
  test('renders', () => {
    const wrapper = shallow(<CocktailList />);
    expect(wrapper).toMatchSnapshot();
  });
});
