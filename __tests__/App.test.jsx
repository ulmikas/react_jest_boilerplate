import React from 'react';
import { mount } from 'enzyme';
import Cookie from 'js-cookie';
import App from '../src/components/App';

jest.mock('js-cookie');


const TABS_SELECTOR = 'ul[data-test="tabs-list"]';
const TAB_SELECTOR = 'li[data-test="tab"]';
const REMOVE_TAB_SELECTOR = '[data-test="remove-tab"]';
const ADD_TAB_SELECTOR = '[data-test="add-tab"]';

const treeObject = tree => ({
  getTabsContainer: () => tree.find(TABS_SELECTOR),
  getTabsList: () => tree.find(TAB_SELECTOR),
  getLastAnchor: () => tree.find(TAB_SELECTOR).last(),
  getNthTab: n => tree.find(TAB_SELECTOR).at(n),
  getRemoveButton: tab => tab.find(REMOVE_TAB_SELECTOR),
  getAddButton: () => tree.find(ADD_TAB_SELECTOR),
  reloadApp: () => tree.unmount().mount(),
});

describe('<App />', () => {
  it('adds tab', () => {
    const tree = mount(<App />);
    const tObj = treeObject(tree);
    const addTabButton = tObj.getAddButton();
    addTabButton.simulate('click');

    expect(tree).toContainMatchingElements(6, TAB_SELECTOR);
  });

  it('remove tab', () => {
    const tree = mount(<App />);
    const tObj = treeObject(tree);
    const tabListBefore = tObj.getTabsContainer();
    const tabToRemove = tObj.getNthTab(1);
    const removeTab = tObj.getRemoveButton(tabToRemove);

    expect(tabListBefore).toContainMatchingElements(5, TAB_SELECTOR);

    removeTab.simulate('click');
    const tabListAfter = tObj.getTabsContainer();

    expect(tabListAfter).toContainMatchingElements(4, TAB_SELECTOR);
  });

  it('set active tab', () => {
    const tree = mount(<App />);
    const tObj = treeObject(tree);
    const tabToBeActive = tObj.getNthTab(1);
    tabToBeActive.simulate('click');

    expect(tObj.getNthTab(0)).toHaveProp('aria-selected', 'false');
    expect(tObj.getNthTab(1)).toHaveProp('aria-selected', 'true');
  });

  // it('check that active tab sets from coockies', () => {
  //   const tree = mount(<App />);
  //   const tObj = treeObject(tree);
  //   Cookie.get.setMockImplementation(() => '2');
  //   // const getIndexFromCoockies = jest.fn(() => Coockies.get('activeTab'));

  //   expect(tObj.getNthTab(2)).toMatchSelector(SELECTED_TAB);
  // });
});
