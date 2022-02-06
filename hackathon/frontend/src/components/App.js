import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Form from './data/Form'
import Dashboard from './data/Dashboard';
import Header from './layout/Header'


class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Header/>
        </div>
        <div>
          <Dashboard/>
        </div>
      </Fragment>
      
    );
  }
}

export default App;
