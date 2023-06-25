import React, { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom';

import { Provider } from 'react-redux';
import store from "./store"

import { 
  UserLoginContextProvider,
  ToastContextProvider,
  EditPostContextProvider,
  EditProfileContextProvider,
  ChatContextProvider
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
            <ChatContextProvider>
              <Provider store={store}>
                <App/>
              </Provider>
            </ChatContextProvider>
          </EditPostContextProvider>
        </EditProfileContextProvider>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);
