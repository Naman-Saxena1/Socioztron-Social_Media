import React, { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from "./store"

import { 
  UserLoginContextProvider,
  ToastContextProvider 
} from './context/index'

const container = document.getElementById('root');
const root = createRoot(container);

store.subscribe(()=>{})

root.render(
  <StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <Provider store={store}>
          <App/>
        </Provider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);
