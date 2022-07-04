import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../state';
import { AppDispatch } from '../state/store';
import { connect, ConnectedProps } from 'react-redux';
import '../styles/account.sass';

interface IProfil extends PropsFromRedux {}

const Account: React.FC<IProfil> = ({ user }) => {
  return (
    <div className='profil'>
      <div className='profil__wrapper'>
        <h2 className='profil__wrapper__title'>Mon compte</h2>
        <h3 className='profil__wrapper__subtitle'>
          Connecté en tant que {user.username}
        </h3>
        <nav className='profil__wrapper__navbar'>
          <ul className='profil__wrapper__navbar__list'>
            <li className='profil__wrapper__navbar__list__element'>
              <Link
                to='/profil/modify'
                className='profil__wrapper__navbar__list__element__link'
              >
                Modifier mes informations personnelles
              </Link>
            </li>
            <li className='profil__wrapper__navbar__list__element'>
              <Link
                to='/profil/modify/password'
                className='profil__wrapper__navbar__list__element__link'
              >
                Changer mon mot de passe
              </Link>
            </li>
            <li className='profil__wrapper__navbar__list__element'>
              <Link
                to='/profil/delete'
                className='profil__wrapper__navbar__list__element__link'
              >
                Supprimer mon compte
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Account);
