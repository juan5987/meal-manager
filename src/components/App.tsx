import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../state';

import Header from './Header';
import LoginForm from './LoginForm';
import Home from './Home';
import Account from './Account';
import CreateAccount from './CreateAccount';
import ImcInfo from './ImcInfo';
import IdealWeightInfo from './IdealWeightInfo';
import Bmr from './Bmr';
import DailiesInfo from './DailiesInfo';
import RegisterConfirmation from './RegisterConfirm';
import PasswordModif from './PasswordModif';
import AccountDelete from './AccountDelete';
import Meals from './Meals';
import CreateMeal from './CreateMeal';
import MealDetails from './MealDetails';
import MealModify from './MealModify';

import '../styles/app.sass';

interface IApp extends PropsFromRedux {}

const App: React.FC<IApp> = ({ isLogged }) => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<CreateAccount />} />
        <Route path='/account' element={<Account />} />
        <Route path='/imc/info' element={<ImcInfo />} />
        <Route path='/idealWeight/info' element={<IdealWeightInfo />} />
        <Route path='/bmr/info' element={<Bmr />} />
        <Route path='/dailies/info' element={<DailiesInfo />} />
        <Route path='/confirmation/:code' element={<RegisterConfirmation />} />
        <Route path='/profil/modify/password' element={<PasswordModif />} />
        <Route path='/profil/delete' element={<AccountDelete />} />
        <Route path='/meals' element={<Meals />} />
        <Route path='/create/meal' element={<CreateMeal />} />
        <Route path='/meal/:id' element={<MealDetails />} />
        <Route path='/modify/meal/:id' element={<MealModify />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLogged: state.user.isLogged,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
