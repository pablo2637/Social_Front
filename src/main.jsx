import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketProvider.jsx';
import './sass/styles.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>

      <Provider store={store}>
        <SocketProvider>

          <App />

        </SocketProvider>
      </Provider>

    </BrowserRouter>

  </React.StrictMode>
)
