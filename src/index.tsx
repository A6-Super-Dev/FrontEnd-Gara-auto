import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../src/common/sass/index.css';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './reduxToolKit-Saga/store';

ReactDOM.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);
