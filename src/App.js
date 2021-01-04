import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HatsPage from './pages/hatspage/HatsPage';
import HomePage from './pages/homepage/HomePage';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={HomePage} />
      <Route path='/hats' component={HatsPage} />
    </div>
  );
};

export default App;
