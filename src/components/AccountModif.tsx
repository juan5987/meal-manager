import axios from 'axios';
import { RootState } from '../state';
import { AppDispatch } from '../state/store';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  updateActivity,
  updateUsername,
  updateAge,
} from '../state/action-creators';

import '../styles/account-modif.sass';

interface IAccountModif extends PropsFromRedux {}

const AccountModif: React.FC<IAccountModif> = ({ user }) => {
  const dispatch = useDispatch();
  const [activity, setActivity]: any = useState<string>(user.activity);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [age, setAge] = useState<number>(user.age);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [newEmailConfirm, setNewEmailConfirm] = useState<string>('');
  const [newEmailError, setNewEmailError] = useState<string>('');
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState<boolean>(false);
  const [emailCodeError, setEmailCodeError] = useState<string>('');
  const [showEmailCodeModal, setShowEmailCodeModal] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>();
  const [code, setCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');

  const handleActivityChange = (e: any) => {
    setActivity(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e: any) => {
    setAge(parseInt(e.target.value));
  };

  const handleNewEmailChange = (e: any) => {
    setNewEmailConfirm(e.target.value);
  };

  const handleChangeInputCode = (e: any) => {
    setInputCode(e.target.value);
  };

  const handleSubmitNewEmail = (e: any) => {
    setNewEmailError('');
    e.preventDefault();
    if (email !== newEmailConfirm) {
      setNewEmailError('Les adresses emails saisies ne correspondent pas.');
    } else {
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let confirmationCode = '';
      for (let i = 0; i < 6; i++) {
        confirmationCode +=
          characters[Math.floor(Math.random() * characters.length)];
      }
      setCode(confirmationCode);
      axios({
        url: `http://localhost:3001/profil/${user.id}/email`,
        method: 'put',
        data: { code: confirmationCode },
      })
        .then((response) => {
          setCode(confirmationCode);
          setShowEmailConfirmationModal(false);
          setShowEmailCodeModal(true);
        })
        .catch((error) => {
          setNewEmailError(
            'Un problème est survenu. Veuillez réessayer. Si le problème persiste, contactez un administrateur'
          );
        });
    }
  };

  const handleSubmitCode = (e: any) => {
    e.preventDefault();
    console.log(code);

    if (inputCode === code) {
      console.log('ok');
    } else {
      setCodeError('Le code de vérification est incorrect');
    }
  };

  const handleSubmit = (e: any) => {
    setErrorMsg('');

    e.preventDefault();
    if (
      activity === user.activity &&
      username === user.username &&
      email === user.email &&
      age === user.age
    ) {
      setErrorMsg('Aucune modification');
      setSuccessMessage('');
    } else {
      if (activity !== user.activity) {
        dispatch(updateActivity(activity));
      }
      if (username !== user.username) {
        dispatch(updateUsername(username));
      }
      if (email !== user.email) {
        setShowEmailConfirmationModal(true);
      }
      if (age !== user.age) {
        dispatch(updateAge(age));
      }
      setSuccessMessage('Données modifiées avec succès');
    }
  };

  return (
    <div className='accountModif'>
      {/* MODAL CONFIRMATION EMAIL */}
      {showEmailConfirmationModal && (
        <div
          onMouseDown={() => setShowEmailConfirmationModal(false)}
          className='accountModif__modalConfirm'
        >
          <form
            onMouseDown={(e) => e.stopPropagation()}
            className='accountModif__modalConfirm__form'
          >
            <h2 className='accountModif__modalConfirm__form__title'>
              Confirmation de l'adresse email
            </h2>
            <label
              className='accountModif__modalConfirm__form__label'
              htmlFor='emailConfirm'
            >
              Nouvelle adresse email
            </label>
            <input
              onChange={handleNewEmailChange}
              className='accountModif__modalConfirm__form__input'
              type='emailConfirm'
              id='email'
            />
            {newEmailError && (
              <p className='accountModif__form__element__error'>
                {newEmailError}
              </p>
            )}
            <button
              onClick={handleSubmitNewEmail}
              className='accountModif__modalConfirm__form__button'
            >
              Valider
            </button>
          </form>
        </div>
      )}
      {/* CODE CONFIRMATION EMAIL */}
      {showEmailCodeModal && (
        <div
          onMouseDown={() => setShowEmailCodeModal(false)}
          className='accountModif__modalConfirm'
        >
          <form
            onMouseDown={(e) => e.stopPropagation()}
            className='accountModif__modalConfirm__form'
          >
            <h2 className='accountModif__modalConfirm__form__title'>
              Vérification de l'adresse email
            </h2>
            <p className='accountModif__modalConfirm__form__advice'>
              Veuillez saisir le code qui vous a été envoyé sur la nouvelle
              adresse email. La réception du mail peut prendre quelques minutes.
            </p>
            <p className='accountModif__modalConfirm__form__advice'>
              Ne pas fermer la page ou rafraichir le navigateur
            </p>
            <label
              className='accountModif__modalConfirm__form__label'
              htmlFor='emailConfirm'
            >
              code de confirmation
            </label>
            <input
              onChange={handleChangeInputCode}
              className='accountModif__modalConfirm__form__input'
              type='emailConfirm'
              id='email'
              value={inputCode}
            />
            {emailCodeError && (
              <p className='accountModif__form__element__error'>
                {emailCodeError}
              </p>
            )}
            {codeError && (
              <p className='accountModif__form__element__error'>{codeError}</p>
            )}
            <button
              onClick={handleSubmitCode}
              className='accountModif__modalConfirm__form__button'
            >
              Valider
            </button>
          </form>
        </div>
      )}
      <form className='accountModif__form'>
        <h2 className='accountModif__form__title'>Mon compte</h2>
        <div className='accountModif__form__element'>
          <label
            className='accountModif__form__element__label'
            htmlFor='username'
          >
            Nom d'utilisateur
          </label>
          <input
            onChange={handleUsernameChange}
            className='accountModif__form__element__input'
            id='username'
            name='username'
            type='text'
            value={username}
          />
        </div>
        <div className='accountModif__form__element'>
          <label className='accountModif__form__element__label' htmlFor='email'>
            Adresse email
          </label>
          <input
            onChange={handleEmailChange}
            className='accountModif__form__element__input'
            id='email'
            name='email'
            type='text'
            value={email}
          />
        </div>
        <div className='accountModif__form__element'>
          <label className='accountModif__form__element__label' htmlFor='age'>
            Age
          </label>
          <input
            onChange={handleAgeChange}
            className='accountModif__form__element__input'
            id='age'
            name='age'
            type='number'
            value={age}
          />
        </div>
        <div className='accountModif__form__element'>
          <label
            className='accountModif__form__element__label'
            htmlFor='activity'
          >
            Activité
          </label>
          <select
            onChange={handleActivityChange}
            className='accountModif__form__element__input'
            id='activity'
            name='activity'
            value={activity}
          >
            <option value='sédentaire'>sédentaire</option>
            <option value='activité légère'>activité légère</option>
            <option value='activité modérée'>activité modérée</option>
            <option value='activité intense'>activité intense</option>
          </select>
        </div>
        {errorMsg && (
          <p className='accountModif__form__element__error'>{errorMsg}</p>
        )}
        {successMessage && (
          <p className='accountModif__form__element__success'>
            {successMessage}
          </p>
        )}
        <div style={{ display: 'flex' }}>
          <button
            onClick={handleSubmit}
            className='accountModif__form__element__button'
          >
            Valider
          </button>
          <Link to='/account' className='accountModif__form__element__link'>
            Retour
          </Link>
        </div>
      </form>
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

export default connector(AccountModif);
