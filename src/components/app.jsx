import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import MainContainer from '../containers/main-container';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" render={() => <MainContainer />} />
        </Router>
      </Provider>
    );
  }
}

export default App;
