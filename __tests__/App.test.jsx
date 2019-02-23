import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('adds tab', () => {
    const tree = mount(<App />);
    const addTabButton = tree.find('[data-tabs="add-tab"]');

    addTabButton.simulate('click');
    expect(tree).toContainMatchingElements(3, 'li[data-tabs="tab"]');
  });

  it('remove tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-tabs="tab"]');
    const tabToRemove = tabs.at(1);
    const removeTab = tabToRemove.find('[data-tabs="remove-tab"]');

    removeTab.simulate('click');

    expect(tree).toContainMatchingElements(1, 'li[data-tabs="tab"]');
  });

  it('set active tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-tabs="tab"]');
    const tabToBeActive = tabs.at(1);

    tabToBeActive.simulate('click');
    const tabsContent = tree.find('div[data-tabs="tab-panel"]').at(1);
    const tabToBeActiveNew = tree.find('li[data-tabs="tab"]').at(1);

    expect(tabToBeActiveNew).toMatchSelector('li[aria-selected="true"]');
    expect(tabsContent.children()).toExist();
  });
});
