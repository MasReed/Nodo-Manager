import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

import App from './App';
import store from './store'
import './index.css';

import reportWebVitals from './reportWebVitals';


// Request logger
axios.interceptors.request.use(req => {
  console.log(`AXIOS REQ: ${req.method} ${req.url}`)
  return req
})

// Response/Error logger
axios.interceptors.response.use(
  res => {
    console.log(`AXIOS RES: ${res.method} ${res.url}`)
    return res
  },
  err => {
    console.log('AXIOS ERR: ', err.response)
    throw err
  }
)

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
