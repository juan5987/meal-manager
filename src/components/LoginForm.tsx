import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { EyeOff, Eye } from 'react-feather';

import { RootState } from '../state';
import { loggingIn } from '../state/action-creators';

import '../styles/login.sass';

interface ILoginForm extends PropsFromRedux {}

const LoginForm: React.FC<ILoginForm> = ({ isLogged, loading, errorMsg }) => {
  const navigate: NavigateFunction = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [stayConnected, setStayConnected] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    email: 'juan@email.fr',
    password: 'Juan1234',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    isLogged && navigate('/dashboard');
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
    dispatch(loggingIn(formValues.email, formValues.password));
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='login__form'>
        <h2 className='login__form__title'>Connexion</h2>
        <div className='login__form__wrapper'>
          <label className='login__form__wrapper__label' htmlFor='email'>
            Adresse email
          </label>
          <input
            onChange={handleInputChange}
            className='login__form__wrapper__input'
            autoComplete='email'
            type='email'
            id='email'
            name='email'
            value={formValues.email}
            required
          />
        </div>
        <div className='login__form__wrapper'>
          <label className='login__form__wrapper__label' htmlFor='password'>
            Mot de passe
          </label>

          {passwordVisibility ? (
            <>
              <input
                onChange={handleInputChange}
                className='login__form__wrapper__input'
                autoComplete='current-password'
                type='text'
                id='password'
                name='password'
                value={formValues.password}
                required
              />
              <div
                className='login__form__wrapper__input__visibility'
                onClick={handlePasswordVisibilityToggle}
              >
                <EyeOff className='login__form__wrapper__input__visibility__icon' />
              </div>
            </>
          ) : (
            <>
              <input
                onChange={handleInputChange}
                className='login__form__wrapper__input'
                autoComplete='current-password'
                type='password'
                id='password'
                name='password'
                value={formValues.password}
                required
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
        <div className='login__form__stayConnected'>
          <label
            className='login__form__stayConnected__label'
            htmlFor='stayconnected'
          >
            Rester connecté
          </label>
          <input
            onChange={() => setStayConnected(!stayConnected)}
            className='login__form__stayConnected__input'
            type='checkbox'
            name='stayconnected'
            id='stayconnected'
            checked={stayConnected}
          />
        </div>
        <div className='login__form__forgotPassword'>
          <span className='login__form__forgotPassword__content'>
            Mot de passe oublié ?
          </span>
        </div>
        <div className='login__form__register'>
          <Link to='/register' className='login__form__register__content'>
            Pas encore inscrit ? Cliquez ici
          </Link>
        </div>
        {loading && (
          <div className='login__form__loader'>
            <div className='login__form__loader__circle'></div>
            <span>Veuillez patienter</span>
          </div>
        )}
        <button className='login__form__submit' type='submit'>
          Connexion
        </button>
      </form>
      {errorMsg && <p className='login__form__error'>{errorMsg}</p>}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isLogged: state.user.isLogged,
    loading: state.user.loading,
    errorMsg: state.user.loggingErrorMsg,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginForm);
