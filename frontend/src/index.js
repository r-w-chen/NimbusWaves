import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import { AudioProvider } from './context/Audio';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';

export const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.sessionActions = sessionActions;
  window.csrfFetch = csrfFetch;
  window.store = store;
}
function Root() {
  
  return (
    <Provider store={store}>
      <AudioProvider>
      <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ModalProvider>
      </AudioProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
