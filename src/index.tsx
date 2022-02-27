import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../src/common/sass/index.css';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './reduxToolKit-Saga/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
