import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import React, { Component } from 'react';

class TabsComponent extends Component {
  render() {
    return (
      <Tabs data-tabs="tabs">
        <TabList data-tabs="tab-list">
          <Tab><span data-tabs="tab">Title 1</span></Tab>
          <Tab><span data-tabs="tab">Title 2</span></Tab>
        </TabList>

        <TabPanel>
          <div data-tabs="tab-panel">
            <h2>Any content 1</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div data-tabs="tab-panel">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

export default TabsComponent;
