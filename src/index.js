import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// React router dom
import { BrowserRouter as Router } from 'react-router-dom';
// Redux toolkit
import { Provider } from 'react-redux';
// store
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
