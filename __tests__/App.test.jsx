import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('adds tab', () => {
    const tree = mount(<App />);
    const addTabButton = tree.find('[data-test="add-tab"]');

    addTabButton.simulate('click');
    expect(tree).toContainMatchingElements(6, 'li[data-test="tab"]');
  });

  it('remove tab', () => {
    const tree = mount(<App />);
    const tabListBefore = tree.find('ul[data-test="tabs-list"]');
    const tabs = tree.find('li[data-test="tab"]');
    const tabToRemove = tabs.at(1);
    const removeTab = tabToRemove.find('[data-test="remove-tab"]');

    expect(tabListBefore).toContainMatchingElements(5, 'li[data-test="tab"]');

    removeTab.simulate('click');
    const tabListAfter = tree.find('ul[data-test="tabs-list"]');

    expect(tabListAfter).toContainMatchingElements(4, 'li[data-test="tab"]');
  });

  it('set active tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-test="tab"]');
    const tabToBeActive = tabs.at(1);

    tabToBeActive.simulate('click');
    const tabsAfter = tree.find('li[data-test="tab"]');

    expect(tabsAfter.at(0)).toMatchSelector('[aria-selected="false"]');
    expect(tabsAfter.at(1)).toMatchSelector('[aria-selected="true"]');
  });
});
