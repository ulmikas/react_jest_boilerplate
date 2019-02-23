import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import uuid from 'uuid';
import debug from 'debug';

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
];

class TabsComponent extends Component {
  state = {
    tabs: TABS,
  };

  handleCloseTab = (event, id) => {
    const { tabs } = this.state;

    debug('tabs ', tabs);

    this.setState({
      tabs: tabs.filter(tab => tab.id !== id),
    });
  };

  handleAddTab = () => {
    const { tabs } =  this.state;

    this.setState({
      tabs: [
        ...tabs,
        { name: `Title ${tabs.length + 1}`, content: `Content ${tabs.length + 1}`, id: uuid() },
      ],
    });
  };

  renderTabName = tab => (
    <Tab key={tab.id}>
      <span data-tabs="tab">{tab.name}</span>
      &nbsp;
      <span onClick={event => this.handleCloseTab(event, tab.id)}>&times;</span>
    </Tab>
  );

  renderTabsContent = ({id, content}) => (
    <TabPanel key={id}>
      <div data-tabs="tab-panel">{content}</div>
    </TabPanel>
  );

  render() {
    const { tabs } = this.state
    return (
      <Tabs data-tabs="tabs">
      <TabList>
        {tabs.map(this.renderTabName)}
        <span onClick={this.handleAddTab}>Add</span>
      </TabList>

        {tabs.map(this.renderTabsContent)}
      </Tabs>
    );
  }
}

export default TabsComponent;
