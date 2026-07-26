import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
 
import { store } from './store/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
      <App />
    </BrowserRouter>
  </Provider>
);