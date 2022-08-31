import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { EyeOff, Eye } from 'react-feather';
import axios from 'axios';
import { loggingOut } from '../state/action-creators';

import { RootState } from '../state';

import '../styles/account-delete.sass';

interface ICreateAccount extends PropsFromRedux {}

const ProfilDelete: React.FC<ICreateAccount> = ({ userId, email }) => {
  const dispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    axios({
      method: 'delete',
      url: `http://localhost:3001/deleteAccount`,
      data: {
        password: password,
        userId: userId,
        email: email,
      },
    })
      .then((response) => {
        setSuccessMsg('Votre compte a bien été supprimé');
        setErrorMsg('');
        window.localStorage.clear();
        dispatch(loggingOut());
      })
      .catch((error) => {
        if (error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg('Le serveur ne répond pas. Contactez un administrateur');
        }
      });
  };

  return (
    <div className='accountDelete'>
      <form className='accountDelete__form' onSubmit={handleSubmit}>
        <h2 className='accountDelete__form__title'>Suppression du compte</h2>
        <p className='accountDelete__form__text warning'>
          Cette action supprimera définitivement votre compte et toutes les
          données qui y sont associées. Il ne sera plus possible de les
          récupérer plus tard.
        </p>
        <p className='accountDelete__form__text'>
          Pour confirmer la suppression de votre compte, saisissez votre mot de
          passe et cliquez sur le bouton "supprimer mon compte"
        </p>
        <div className='accountDelete__form__wrapper'>
          <label
            htmlFor='password'
            className='accountDelete__form__wrapper__label'
          >
            Mot de passe
          </label>
          {passwordVisibility ? (
            <>
              <input
                type='text'
                className='accountDelete__form__wrapper__input'
                id='password'
                name='password'
                autoComplete='current-password'
                onChange={handleInputChange}
                required
                value={password}
              />
              <div
                className='accountDelete__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <EyeOff className='accountDelete__form__wrapper__input__visibility__icon' />
              </div>
            </>
          ) : (
            <>
              <input
                type='password'
                className='accountDelete__form__wrapper__input'
                id='password'
                name='password'
                autoComplete='current-password'
                onChange={handleInputChange}
                required
                value={password}
              />
              <div
                className='accountDelete__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <Eye className='accountDelete__form__wrapper__input__visibility__icon' />
              </div>
            </>
          )}
        </div>
        {errorMsg && <p className='accountDelete__form__error'>{errorMsg}</p>}
        {successMsg && (
          <p className='accountDelete__form__success'>{successMsg}</p>
        )}

        <button type='submit' className='accountDelete__form__submit'>
          Supprimer mon compte
        </button>
        <button type='button' className='accountDelete__form__cancel'>
          annuler
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userId: state.user.user.id,
    email: state.user.user.email,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProfilDelete);
