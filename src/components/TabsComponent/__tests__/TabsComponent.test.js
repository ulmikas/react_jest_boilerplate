import React from 'react';
import { shallow } from 'enzyme';
import TabsComponent from '../TabsComponent';

it('should render correctly with no props', () => {
  const component = shallow(<TabsComponent/>);

  expect(component).toMatchSnapshot();
});

it('should render correctly with prop classname', () => {
  const component = shallow(<TabsComponent className="test" />);

  expect(component).toMatchSnapshot();
});
