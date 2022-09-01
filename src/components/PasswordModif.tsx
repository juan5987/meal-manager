import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';
import { EyeOff, Eye } from 'react-feather';

import { RootState } from '../state';

import '../styles/password-modif.sass';
import { Link } from 'react-router-dom';

interface ICreateAccount extends PropsFromRedux {}

const PasswordModif: React.FC<ICreateAccount> = ({ userId, email }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [formValues, setFormValues] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formValues.newPassword != formValues.newPasswordConfirm) {
      setErrorMsg('La confirmation du mot de passe ne correspond pas');
    } else if (
      formValues.newPassword.length < 8 ||
      !/\d/.test(formValues.newPassword) ||
      !/[A-Z]/.test(formValues.newPassword) ||
      !/[a-z]/.test(formValues.newPassword)
    ) {
      setErrorMsg('Format du mot de passe incorrect');
    } else if (formValues.newPassword === formValues.currentPassword) {
      setErrorMsg("Le nouveau mot de passe est identique à l'ancien");
    } else {
      axios({
        method: 'post',
        url: `http://localhost:3001/updatePassword`,
        data: {
          currentPassword: formValues.currentPassword,
          newPassword: formValues.newPassword,
          userId: userId,
          email: email,
        },
      })
        .then((response) => {
          setSuccessMsg('Mot de passe modifié avec succès');
          setErrorMsg('');
        })
        .catch((error) => {
          if (error.response.data.message) {
            setErrorMsg(error.response.data.message);
          } else {
            setErrorMsg(
              'Le serveur ne répond pas. Contactez un administrateur'
            );
          }
        });
    }
  };

  return (
    <div className='passwordModif'>
      <form onSubmit={handleSubmit} className='passwordModif__form'>
        <h2 className='passwordModif__form__title'>
          Modification du mot de passe
        </h2>
        <div className='passwordModif__form__wrapper'>
          <label
            className='passwordModif__form__wrapper__label'
            htmlFor='currentPassword'
          >
            Mot de passe actuel
          </label>
          {passwordVisibility ? (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='text'
                id='currentPassword'
                name='currentPassword'
                autoComplete='current-password'
                onChange={handleInputChange}
                required
                value={formValues.currentPassword}
              />
              <div
                className='passwordModif__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <EyeOff className='passwordModif__form__wrapper__input__visibility__icon' />
              </div>
            </>
          ) : (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='password'
                id='currentPassword'
                name='currentPassword'
                autoComplete='current-password'
                onChange={handleInputChange}
                required
                value={formValues.currentPassword}
              />
              <div
                className='login__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <Eye className='login__form__wrapper__input__visibility__icon' />
              </div>
            </>
          )}
        </div>
        <div className='passwordModif__form__wrapper'>
          <label
            className='passwordModif__form__wrapper__label'
            htmlFor='currentPassword'
          >
            Nouveau mot de passe
          </label>
          {passwordVisibility ? (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='text'
                id='newPassword'
                name='newPassword'
                autoComplete='new-password'
                onChange={handleInputChange}
                required
                value={formValues.newPassword}
              />
              <div
                className='passwordModif__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <EyeOff className='passwordModif__form__wrapper__input__visibility__icon' />
              </div>
            </>
          ) : (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='password'
                id='newPassword'
                name='newPassword'
                autoComplete='new-password'
                onChange={handleInputChange}
                required
                value={formValues.newPassword}
              />
              <div
                className='login__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <Eye className='login__form__wrapper__input__visibility__icon' />
              </div>
            </>
          )}
        </div>
        <div className='passwordModif__form__wrapper'>
          <label
            className='passwordModif__form__wrapper__label'
            htmlFor='currentPassword'
          >
            Nouveau mot de passe (confirmation)
          </label>
          {passwordVisibility ? (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='text'
                id='newPasswordConfirm'
                name='newPasswordConfirm'
                autoComplete='new-password'
                onChange={handleInputChange}
                required
                value={formValues.newPasswordConfirm}
              />
              <div
                className='passwordModif__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <EyeOff className='passwordModif__form__wrapper__input__visibility__icon' />
              </div>
            </>
          ) : (
            <>
              <input
                className='passwordModif__form__wrapper__input'
                type='password'
                id='newPasswordConfirm'
                name='newPasswordConfirm'
                autoComplete='new-password'
                onChange={handleInputChange}
                required
                value={formValues.newPasswordConfirm}
              />
              <div
                className='passwordModif__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <Eye className='passwordModif__form__wrapper__input__visibility__icon' />
              </div>
            </>
          )}
        </div>
        {errorMsg && <p className='passwordModif__form__error'>{errorMsg}</p>}

        {successMsg && (
          <p className='passwordModif__form__success'>{successMsg}</p>
        )}
        <div style={{ display: 'flex' }}>
          {!successMsg && (
            <button className='passwordModif__form__submit' type='submit'>
              Valider
            </button>
          )}

          <Link
            to='/account'
            className='passwordModif__form__cancel'
            type='button'
          >
            Retour
          </Link>
        </div>
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

export default connector(PasswordModif);
