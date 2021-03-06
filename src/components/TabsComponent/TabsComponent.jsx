import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import uuid from 'uuid';
import debug from 'debug';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { getRssContent } from '../../utils/rssUtils';

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
    modalIsOpen: false,
    loading: false,
    rssLink: '',
    error: false,
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false, error: false, loading: false });
  };

  handleCloseTab = (event, id) => {
    const { tabs } = this.state;

    this.setState({
      tabs: tabs.filter(tab => tab.id !== id),
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    this.hanldeStartLoading();
    this.createTab(this.state.rssLink);
  };

  hanldeStartLoading = () => {
    this.setState({ loading: true });
  };

  hanldeStopLoading = () => {
    this.setState({ loading: false });
  };

  createTab = async url => {
    const content = await getRssContent(url);

    if (content.error) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const tab = {
        name: url,
        content: content,
        id: uuid(),
      };
      this.addTab(tab);
      this.hanldeStopLoading();
      this.handleCloseModal();
    }
  };

  addTab = tab => {
    this.setState({
      tabs: [...this.state.tabs, tab],
    });
  };

  renderErrorMsg = msg => <div>{msg}</div>;

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.handleCloseModal}
        contentLabel="Веедите rss"
        ariaHideApp={false}
      >
        <div data-test="modal">
          <button onClick={this.handleCloseModal}>close</button>
          <div>Введите урл RSS</div>
          <form data-test="rss-form" onSubmit={this.handleSubmitForm}>
            <input
              data-test="rss-input"
              name="rss"
              value={this.state.rssLink}
              onChange={e => {
                this.setState({ rssLink: e.target.value });
              }}
              type="url"
              required
            />
            <button data-test="modal-submit" type="submit">
              Создать
            </button>
          </form>

          {this.state.error && this.renderErrorMsg('Не удалось загрузить данные')}
        </div>
      </Modal>
    );
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
      <div>{Array.isArray(content) ? content.map(item => <p key={item}>{item}</p>) : content}</div>
    </TabPanel>
  );

  render() {
    const { tabs } = this.state;
    return (
      <div>
        <Tabs
          data-test="tabs"
          defaultIndex={this.getIndexFromCoockies()}
          onSelect={this.setCoockie}
        >
          <TabList data-test="tabs-list">
            {tabs.map(this.renderTabName)}
            <button
              data-test="add-tab"
              onClick={this.handleOpenModal}
              disabled={this.state.loading}
            >
              Add
            </button>
          </TabList>

          {tabs.map(this.renderTabsContent)}
        </Tabs>
        {this.renderModal()}
      </div>
    );
  }
}

export default TabsComponent;
