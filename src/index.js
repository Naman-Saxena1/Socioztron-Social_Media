import React, { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from "./store"

import { 
  UserLoginContextProvider,
  ToastContextProvider,
  EditPostContextProvider 
} from './context/index'

const container = document.getElementById('root');
const root = createRoot(container);

store.subscribe(()=>{})

root.render(
  <StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <EditPostContextProvider>
          <Provider store={store}>
            <App/>
          </Provider>
        </EditPostContextProvider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);
