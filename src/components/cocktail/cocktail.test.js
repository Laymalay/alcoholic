import React from 'react';
import { shallow } from 'enzyme';
import Cocktail from './cocktail';

describe('<Cocktail />', () => {
  test('renders', () => {
    const wrapper = shallow(<Cocktail />);
    expect(wrapper).toMatchSnapshot();
  });
});
