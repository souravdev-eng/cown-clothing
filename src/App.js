import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page/HomePage';
import ShopPage from './pages/shop-page/ShopPage';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
    </div>
  );
};

export default App;
