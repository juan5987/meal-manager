import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import LoginForm from './LoginForm';

import '../styles/app.sass';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
