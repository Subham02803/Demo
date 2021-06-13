import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { createStore } from 'redux';
import displayDataReducer from './reducers/selected-value';

const store = createStore(displayDataReducer);

 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
