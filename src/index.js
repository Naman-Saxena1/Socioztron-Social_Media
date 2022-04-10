import React, { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { 
  UserLoginContextProvider,
  ToastContextProvider 
} from './context/index'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <UserLoginContextProvider>
      <ToastContextProvider>
        <App/>
      </ToastContextProvider>
    </UserLoginContextProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
