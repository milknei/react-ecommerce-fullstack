import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@entities/cart/index';
import { wishListReducer } from '@entities/wishlist/index';
import { userReducer } from '@entities/user/index';
import { AppRouter } from './app-router';
import { AppProviderHelper } from './app-provider-helper';
import '@shared/base.css';

const store = configureStore({
  reducer: { cart: cartReducer.reducer, wishList: wishListReducer.reducer, user: userReducer.reducer },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProviderHelper>
        <CssBaseline />
        <AppRouter />
      </AppProviderHelper>
    </Provider>
  </React.StrictMode>
);
