import React, { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from "./store"

import { 
  UserLoginContextProvider,
  ToastContextProvider,
  EditPostContextProvider,
  EditProfileContextProvider 
} from './context/index'

const container = document.getElementById('root');
const root = createRoot(container);

store.subscribe(()=>{})

root.render(
  <StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <EditProfileContextProvider>
          <EditPostContextProvider>
            <Provider store={store}>
              <App/>
            </Provider>
          </EditPostContextProvider>
        </EditProfileContextProvider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);
