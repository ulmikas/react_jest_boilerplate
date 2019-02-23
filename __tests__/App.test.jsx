import React from 'react';
import { mount, shallow, render } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('should render correctly tab 3', () => {
    const tree = mount(<App />);
    const tabLast = tree.find('[data-tabs="tab"]').last();
    tabLast.simulate('click');
    const tabContentLast = tree.find('[data-tabs="tab-panel"]').last();
    expect(tabContentLast).toMatchSnapshot();
  });
});
