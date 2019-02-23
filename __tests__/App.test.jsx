import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('adds tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-tabs="tab"]');
    const addTabButton = tree.find('[data-tabs="add-tab"]');

    addTabButton.simulate('click');
    const newTabs = tree.find('li[data-tabs="tab"]');

    expect(newTabs).toHaveLength(tabs.length + 1);
  });

  it('remove tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-tabs="tab"]');
    const tabToRemove = tabs.at(1);
    const removeTab = tabToRemove.find('[data-tabs="remove-tab"]');
    const removeTabId = tabToRemove.getDOMNode().id;
    removeTab.simulate('click');

    expect(tree.find(`#${removeTabId}`)).toHaveLength(0);
  });

  it('set active tab', () => {
    const tree = mount(<App />);
    const tabs = tree.find('li[data-tabs="tab"]');
    const tabToBeActive = tabs.at(1);

    tabToBeActive.simulate('click');
    const tabsContent = tree.find('div[data-tabs="tab-panel"]').at(1);

    expect(tabsContent.children()).toExist();
  });
});
