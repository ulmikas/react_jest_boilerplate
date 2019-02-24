import React from 'react';
import { mount } from 'enzyme';
import Cookie from 'js-cookie';
import nock from 'nock';
import delay from 'delay';
import Parser from 'rss-parser';
import getFeedItems from '../__fixtures__/getFeedItems';

import App from '../src/components/App';

jest.mock('js-cookie');

const TABS_SELECTOR = 'ul[data-test="tabs-list"]';
const TAB_SELECTOR = 'li[data-test="tab"]';
const TAB_CONTENT_SELECTOR = 'div[data-test="tab-panel"]';
const REMOVE_TAB_SELECTOR = '[data-test="remove-tab"]';
const ADD_TAB_SELECTOR = '[data-test="add-tab"]';
const MODAL_SELECTOR = '[data-test="modal"]';
const MODAL_SUBMIT_SELECTOR = '[data-test="modal-submit"]';
const RSS_INPUT = '[data-test="rss-input"]';
const RSS_FORM = '[data-test="rss-form"]';

const createSelector = tree => ({
  getTabsContainer: () => tree.find(TABS_SELECTOR),
  getTabsList: () => tree.find(TAB_SELECTOR),
  getNthTab: n => tree.find(TAB_SELECTOR).at(n),
  getLastTab: () => tree.find(TAB_SELECTOR).last(),
  getLastTabContent: () => tree.find(TAB_CONTENT_SELECTOR).last(),
  getRemoveButton: tab => tab.find(REMOVE_TAB_SELECTOR),
  getAddButton: () => tree.find(ADD_TAB_SELECTOR),
  getModal: () => tree.find(MODAL_SELECTOR),
  getModalSubmit: () => tree.find(MODAL_SUBMIT_SELECTOR),
  getRssInput: () => tree.find(RSS_INPUT),
  getRssForm: () => tree.find(RSS_FORM),
  reloadApp: () => tree.unmount().mount(),
});

describe('<App />', () => {
  it('adds tab', async () => {
    const parser = new Parser();
    const feed = await parser.parseString(getFeedItems);
    const firstItemTitle = feed.items[0].title;

    const host = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://test.com';
    nock.disableNetConnect();
    nock(host)
      .get(`/${url}`)
      .reply(200, getFeedItems);

    const tree = mount(<App />);
    const tObj = createSelector(tree);
    const tabsBeforeCreate = tObj.getTabsContainer();
    const addTabButton = tObj.getAddButton();

    expect(tabsBeforeCreate).toContainMatchingElements(5, TAB_SELECTOR);

    addTabButton.simulate('click');
    const inputLink = tObj.getRssInput();
    inputLink.simulate('change', { target: { value: url } });
    const form = tObj.getRssForm();
    form.simulate('submit');
    await delay(100);
    tree.update();
    const tabsAfterCreate = tObj.getTabsContainer();
    const lastTab = tObj.getLastTab();
    lastTab.simulate('click');
    const lastTabContent = tObj.getLastTabContent();

    expect(tabsAfterCreate).toContainMatchingElements(6, TAB_SELECTOR);
    expect(lastTabContent).toHaveText(firstItemTitle);
  });

  it('remove tab', () => {
    const tree = mount(<App />);
    const tObj = createSelector(tree);
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
    const tObj = createSelector(tree);
    const tabToBeActive = tObj.getNthTab(1);
    tabToBeActive.simulate('click');

    expect(tObj.getNthTab(0)).toHaveProp('aria-selected', 'false');
    expect(tObj.getNthTab(1)).toHaveProp('aria-selected', 'true');
  });

  it('check that active tab sets from coockies', () => {
    const TAB_INDEX = 4;

    function CookieContainer() {
      let selectedTab = TAB_INDEX;
      return {
        get() {
          return selectedTab;
        },
        set(i) {
          selectedTab = i;
        },
      };
    }
    const cooks = CookieContainer();
    Cookie.set.mockImplementation((_, i) => cooks.set(i));
    Cookie.get.mockImplementation(() => cooks.get());

    const tree = mount(<App />);
    const tObj = createSelector(tree);

    expect(cooks.get()).toEqual(TAB_INDEX);
    expect(tObj.getNthTab(TAB_INDEX)).toHaveProp('aria-selected', 'true');
    tObj.getNthTab(TAB_INDEX - 1).simulate('click');

    const newTree = mount(<App />);
    const tObj2 = createSelector(newTree);

    expect(cooks.get()).toEqual(TAB_INDEX - 1);
    expect(tObj2.getNthTab(TAB_INDEX - 1)).toHaveProp('aria-selected', 'true');
  });
});
