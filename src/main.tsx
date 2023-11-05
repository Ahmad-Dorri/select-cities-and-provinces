import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.module.css';

import IRANSans from '../public/fonts/IRANSans.woff2';

import { RTL } from './providers/cache-provider.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import App from './App.tsx';
import ErrorPage from './pages/error-page.tsx';
import { store } from './store/store.ts';
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);
const theme = createTheme({
  typography: {
    fontFamily: 'IranSans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'IranSans';
        src: local('Raleway'), local('Raleway-Regular'), url(${IRANSans}) format('woff2');
      `,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RTL>
          <RouterProvider router={router} />
        </RTL>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
