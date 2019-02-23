import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import App from './components/App';

const stateLogger = debug('setState:');
const setState = React.Component.prototype.setState;
React.Component.prototype.setState = function (nextState) {
  stateLogger('Name: ', this.constructor.name);
  stateLogger('Old state: ', this.state);
  setState.apply(this, [
    nextState,
    () => {
      stateLogger('New state: ', this.state);
    },
  ]);
};

ReactDOM.render(<App />, document.getElementById('root'));
