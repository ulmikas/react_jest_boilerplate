import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('should render correctly tab 3', () => {
    const tree = mount(<App />);
    const tabLast = tree.find('[data-tabs="tab"]').last();
    expect(tree.render()).toMatchSnapshot();
    tabLast.simulate('click');
    expect(tree.render()).toMatchSnapshot();
  });
});
