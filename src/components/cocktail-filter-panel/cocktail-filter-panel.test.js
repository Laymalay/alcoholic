import React from 'react';
import { shallow } from 'enzyme';
import CocktailFilterPanel from './cocktail-filter-panel';

describe('<CocktailFilterPanel />', () => {
  test('renders', () => {
    const wrapper = shallow(<CocktailFilterPanel />);
    expect(wrapper).toMatchSnapshot();
  });
});
