import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Form from './data/Form'
import Contract from './Contract'
import Dashboard from './data/Dashboard';


class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Dashboard/>
          <Contract/>
        </div>
      </Fragment>
      
    );
  }
}

export default App;
