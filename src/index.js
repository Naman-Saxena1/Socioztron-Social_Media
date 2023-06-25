import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store"

import { 
  UserLoginContextProvider,
  ToastContextProvider,
  EditPostContextProvider,
  EditProfileContextProvider,
  ChatContextProvider
} from './context/index'

store.subscribe(()=>{})

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);