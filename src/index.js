import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { } from 'react-icons'
import "remixicon/fonts/remixicon.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {store, persistor} from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          pauseOnHover={false}
          theme="dark"
          />
        <App />
          </PersistGate>
      </Provider>

    </BrowserRouter>
);

