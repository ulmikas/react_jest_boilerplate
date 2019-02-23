import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import uuid from 'uuid';
import debug from 'debug';
import Cookies from 'js-cookie';

import React, { Component } from 'react';

const TABS = [
  {
    name: 'Title 1',
    content: 'Content 1',
    id: uuid(),
  },
  {
    name: 'Title 2',
    content: 'Content 2',
    id: uuid(),
  },
  {
    name: 'Title 3',
    content: 'Content 3',
    id: uuid(),
  },
  {
    name: 'Title 4',
    content: 'Content 4',
    id: uuid(),
  },
  {
    name: 'Title 5',
    content: 'Content 5',
    id: uuid(),
  },
];

class TabsComponent extends Component {
  state = {
    tabs: TABS,
  };

  handleCloseTab = (event, id) => {
    const { tabs } = this.state;

    this.setState({
      tabs: tabs.filter(tab => tab.id !== id),
    });
  };

  handleAddTab = () => {
    const { tabs } = this.state;

    this.setState({
      tabs: [
        ...tabs,
        { name: `Title ${tabs.length + 1}`, content: `Content ${tabs.length + 1}`, id: uuid() },
      ],
    });
  };

  setCoockie = index => {
    Cookies.set('activeTab', index);
  };

  getIndexFromCoockies = () => parseInt(Cookies.get('activeTab'), 10);

  renderTabName = tab => (
    <Tab data-test="tab" key={tab.id}>
      <span data-test="tab-name">{tab.name}</span>
      &nbsp;
      <span data-test="remove-tab" onClick={event => this.handleCloseTab(event, tab.id)}>
        &times;
      </span>
    </Tab>
  );

  renderTabsContent = ({ id, content }) => (
    <TabPanel data-test="tab-panel" key={id}>
      <div>{content}</div>
    </TabPanel>
  );

  render() {
    const { tabs } = this.state;
    return (
      <Tabs data-test="tabs" defaultIndex={this.getIndexFromCoockies()} onSelect={this.setCoockie}>
        <TabList data-test="tabs-list">
          {tabs.map(this.renderTabName)}
          <span data-test="add-tab" onClick={this.handleAddTab}>
            Add
          </span>
        </TabList>

        {tabs.map(this.renderTabsContent)}
      </Tabs>
    );
  }
}

export default TabsComponent;
