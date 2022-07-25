import React, { useState } from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { EyeOff } from 'react-feather';
import { Eye } from 'react-feather';
import * as EmailValidator from 'email-validator';
import moment from 'moment';
import axios from 'axios';

import { register } from '../state/action-creators';
import { IMCResult } from '../utils/imc';
import { calculateDailyIntake } from '../utils/dailyIntake';
import { calculateBMR } from '../utils/dailyIntake';
import { IregisterInfo } from '../state/user';
import { RootState } from '../state';

import '../styles/create-account.sass';

interface ICreateAccount extends PropsFromRedux {}

const CreateAccount: React.FC<ICreateAccount> = ({ errorMsg, loading }) => {
  const dispatch = useDispatch();
  let [currentStep, setCurrentStep] = useState(1);
  let [displayHelp, setDisplayHelp] = useState('');
  let [formError, setFormError] = useState('');
  let [formValues, setFormValues] = useState<IregisterInfo>({
    age: 35,
    height: 178,
    weight: 119,
    goal: 80,
    sex: 'Homme',
    activity: 'sédentaire',
    username: 'Juan',
    email: 'jeanluc.machado@gmail.com',
    emailConfirm: 'jeanluc.machado@gmail.com',
    password: 'Juan1234',
    passwordConfirm: 'Juan1234',
    date: moment().format('yyyy-MM-DD'),
  });
  const [inputErrorAge, setInputErrorAge] = useState(false);
  const [inputErrorHeight, setInputErrorHeight] = useState(false);
  const [inputErrorWeight, setInputErrorWeight] = useState(false);
  const [inputErrorUsername, setInputErrorUsername] = useState(false);
  const [inputErrorEmail, setInputErrorEmail] = useState(false);
  const [inputErrorEmailConfirm, setInputErrorEmailConfirm] = useState(false);
  const [inputErrorPassword, setInputErrorPassword] = useState(false);
  const [inputErrorPasswordConfirm, setInputErrorPasswordConfirm] =
    useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [usernameAlreadyExist, setUsernameAlreadyExist] = useState(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [isChecked, SetIsChecked] = useState(false);
  const [imc, setImc] = useState(0);
  const [idealWeight, setIdealWeight] = useState(0);
  const [bmr, setBmr] = useState(0);
  const [dailies, setDailies] = useState({
    calorie: 0,
    carbohydrate: 0,
    protein: 0,
    lipid: 0,
    fiber: 0,
  });

  const checkStepOneValues = () => {
    let age = false;
    let height = false;
    let weight = false;

    if (formValues.weight > 10 && formValues.weight < 500) {
      weight = true;
      setInputErrorWeight(false);
    } else {
      setDisplayHelp('weight');
      setInputErrorWeight(true);
      setFormError('Veuillez saisir un poids correct');
    }

    if (formValues.height > 50 && formValues.height < 300) {
      height = true;
      setInputErrorHeight(false);
    } else {
      setDisplayHelp('height');
      setInputErrorHeight(true);
      setFormError('Veuillez saisir une taille correcte');
    }

    if (formValues.age > 1 && formValues.age < 150) {
      age = true;
      setInputErrorAge(false);
    } else {
      setDisplayHelp('age');
      setInputErrorAge(true);
      setFormError('Veuillez saisir un âge correct');
    }

    if (age && height && weight) {
      return true;
    } else {
      return false;
    }
  };

  const checkStepTwoValues = () => {
    let username = false;
    let email = false;
    let emailConfirm = false;
    let password = false;
    let passwordConfirm = false;

    if (formValues.password === formValues.passwordConfirm) {
      passwordConfirm = true;
      setInputErrorPasswordConfirm(false);
    } else {
      setFormError('La confirmation du mot de passe ne correspond pas');
      setInputErrorPasswordConfirm(true);
      setDisplayHelp('passwordConfirm');
    }

    if (
      formValues.password.length >= 8 &&
      /\d/.test(formValues.password) &&
      /[A-Z]/.test(formValues.password) &&
      /[a-z]/.test(formValues.password)
    ) {
      password = true;
      setInputErrorPassword(false);
    } else {
      setFormError('Format du mot de passe incorrect');
      setInputErrorPassword(true);
      setDisplayHelp('password');
    }

    if (formValues.email === formValues.emailConfirm) {
      emailConfirm = true;
      setInputErrorEmailConfirm(false);
    } else {
      setFormError("La confirmation de l'email est erronée");
      setInputErrorEmailConfirm(true);
      setInputErrorEmail(true);
      setDisplayHelp('emailConfirm');
    }

    if (EmailValidator.validate(formValues.email)) {
      email = true;
      setInputErrorEmail(false);
    } else {
      setFormError("format de l'email incorrect");
      setInputErrorEmail(true);
      setDisplayHelp('email');
    }

    if (
      formValues.username.length >= 2 &&
      formValues.username.length <= 18 &&
      /^[A-Za-z0-9]*$/.test(formValues.username) &&
      /^[A-Za-z]*$/.test(formValues.username[0])
    ) {
      username = true;
      setInputErrorUsername(false);
    } else {
      setFormError('Pseudo incorrect');
      setInputErrorUsername(true);
      setDisplayHelp('username');
    }

    if (username && email && emailConfirm && password && passwordConfirm) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormError('');
    setDisplayHelp('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setFormError('');
    setDisplayHelp('');

    if (currentStep >= 0 && currentStep <= 3) {
      if (currentStep === 1) {
        if (checkStepOneValues()) {
          setCurrentStep(currentStep + 1);
        }
      } else if (currentStep === 2) {
        if (checkStepTwoValues()) {
          setUsernameAlreadyExist(false);
          setEmailAlreadyExist(false);
          axios({
            method: 'post',
            url: `http://localhost:3001/pre-register`,
            data: {
              email: formValues.email,
              username: formValues.username,
            },
          })
            .then((response) => {
              console.log(response);
              setCurrentStep(currentStep + 1);
            })
            .catch((error) => {
              console.log(error.response.data.message);
              if (error.response.data.message === 'both') {
                setUsernameAlreadyExist(true);
                setEmailAlreadyExist(true);
                setFormError('Ce pseudo et cette email sont déjà enregistrés');
              } else if (error.response.data.message === 'email') {
                setEmailAlreadyExist(true);
                setFormError('Cette adresse email est déjà enregistrée');
              } else if (error.response.data.message === 'username') {
                setUsernameAlreadyExist(true);
                setFormError('Ce pseudo est déjà utilisé');
              }
            });
        }
      } else if (currentStep === 3) {
        if (isChecked) {
          setImc(
            Math.round(
              (formValues.weight /
                ((formValues.height / 100) * (formValues.height / 100))) *
                10
            ) / 10
          );
          setDailies(
            calculateDailyIntake(
              formValues.weight,
              formValues.height,
              formValues.age,
              formValues.sex,
              formValues.activity
            )
          );

          setBmr(
            calculateBMR(
              formValues.weight,
              formValues.height,
              formValues.age,
              formValues.sex
            )
          );

          if (formValues.sex === 'Femme') {
            setIdealWeight(
              formValues.height - 100 - (formValues.height - 150) / 2.5
            );
          } else if (formValues.sex === 'Homme') {
            setIdealWeight(
              formValues.height - 100 - (formValues.height - 150) / 4
            );
          }
          setCurrentStep(currentStep + 1);
          dispatch(
            register({
              username: formValues.username,
              email: formValues.email,
              emailConfirm: formValues.emailConfirm,
              password: formValues.password,
              passwordConfirm: formValues.passwordConfirm,
              height: formValues.height,
              age: formValues.age,
              sex: formValues.sex,
              activity: formValues.activity,
              weight: formValues.weight,
              goal: formValues.goal,
              date: moment().format('YYYY-MM-DD'),
            })
          );
        } else {
          setFormError(
            'Vous devez lire et accepter les CGU pour valider votre inscription'
          );
        }
      }
    }
  };

  return (
    <div className='createAccount'>
      <div className='createAccount__wrapper'>
        <h2 className='createAccount__wrapper__title'>
          Création d'un compte utilisateur
        </h2>
        {/* FORM STEP ONE */}
        {currentStep === 1 && (
          <>
            <div className='createAccount__wrapper__info'>
              <h2 className='createAccount__wrapper__info__title'>
                Étape 1 / 3 : Création de votre profil
              </h2>
              <p className='createAccount__wrapper__info__text'>
                Afin de créer votre profil et de calculer vos besoins
                journaliers, votre poids idéal et votre indice de masse
                corporelle, nous avons besoin de quelques informations.
              </p>
              <p className='createAccount__wrapper__info__text'>
                <strong>
                  La création de votre profil devrait prendre moins de 3 minutes
                </strong>
              </p>
            </div>

            <form
              className='createAccount__wrapper__form'
              onSubmit={handleSubmit}
            >
              <h2 className='createAccount__wrapper__form__title'>
                Formulaire à compléter
              </h2>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Votre age
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border: inputErrorAge
                        ? '4px solid red'
                        : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    id='age'
                    name='age'
                    value={formValues.age}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('age')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'age' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Votre age <strong>en années</strong> avec des caractères
                      numériques.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemple: 35</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='height'
                >
                  Votre taille
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border: inputErrorHeight
                        ? '4px solid red '
                        : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    id='height'
                    name='height'
                    value={formValues.height}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('height')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'height' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Votre taille <strong>en centimètres</strong> avec des
                      caractères numériques.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemple: 175</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='weight'
                >
                  Votre poids actuel
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border: inputErrorWeight
                        ? '4px solid red '
                        : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    id='weight'
                    name='weight'
                    value={formValues.weight}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('weight')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'weight' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Votre poids <strong>en kilos</strong> avec des caractères
                      numériques. Utilisez un point si la valeur est décimale.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemples: 80 ou 80.7</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='weight'
                >
                  Votre objectif de poids
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border: inputErrorWeight
                        ? '4px solid red '
                        : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    id='goal'
                    name='goal'
                    value={formValues.goal}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('goal')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'goal' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Votre objectif actuel <strong>en kilos</strong> avec des
                      caractères numériques. Utilisez un point si la valeur est
                      décimale.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      Vous pourrez modifier votre objectif plus tard.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemples: 80 ou 80.7</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='sex'
                >
                  Votre sexe
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <select
                    className='createAccount__wrapper__form__element__input'
                    id='sex'
                    name='sex'
                    value={formValues.sex}
                    onChange={handleChange}
                  >
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='Femme'
                    >
                      Femme
                    </option>
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='Homme'
                    >
                      Homme
                    </option>
                  </select>
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('sex')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'sex' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      La formule de Black et al pour calculer le métaboslime de
                      repos prend en compte le sexe dans son calcul. Il s'agit
                      ici du{' '}
                      <strong> sexe d'un point de vue anatomique.</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='sex'
                >
                  Votre activité
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <select
                    className='createAccount__wrapper__form__element__input'
                    id='activity'
                    name='activity'
                    value={formValues.activity}
                    onChange={handleChange}
                  >
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='sédentaire'
                    >
                      Sédentaire
                    </option>
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='activité légère'
                    >
                      Activité légère
                    </option>
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='activité modérée'
                    >
                      Activité modérée
                    </option>
                    <option
                      className='createAccount__wrapper__form__element__input'
                      value='activité intense'
                    >
                      Activité intense
                    </option>
                  </select>
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('activity')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'activity' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Selon votre activité, vos besoins journaliers seront plus
                      ou moins important.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>Sédentaire:</strong> travail de bureau avec faible
                      activité physique
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>Activité légère:</strong> activité physique 1 à 3
                      fois par semaine
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>Activité modérée:</strong> activité physique 4 à 6
                      fois par semaine
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>Activité intense:</strong> activité physique plus
                      de 6 fois par semaine
                    </p>
                  </div>
                </div>
              </div>
              {formError && (
                <p className='createAccount__wrapper__form__error'>
                  {formError}
                </p>
              )}
              <button
                className='createAccount__wrapper__form__submit'
                type='submit'
              >
                Valider le formulaire
              </button>
            </form>
          </>
        )}
        {/* FORM STEP TWO */}
        {currentStep === 2 && (
          <>
            <div className='createAccount__wrapper__info'>
              <h2 className='createAccount__wrapper__info__title'>
                Étape 2 / 3 : Création de votre compte utilisateur
              </h2>
              <p className='createAccount__wrapper__info__text'>
                Vous devez maintenant créer un compte utilisateur afin
                d'enregistrer définitivement vos informations. Pour cela vous
                devez renseigner un pseudo, une adresse email et un mot de
                passe.
              </p>
              <p className='createAccount__wrapper__info__text'>
                Ces informations sont indispensables pour pouvoir enregistrer
                vos données dans notre base. Ces données sont privées et aucun
                autre utilisateur n'y aura accès.
              </p>
              <p className='createAccount__wrapper__info__text'>
                Pour en savoir plus sur notre politique de gestion des données,
                vous pouvez consulter nos conditions générales d'utilisation
                disponibles en cliquant sur le lien ci-dessous:
              </p>
              <Link
                className='createAccount__wrapper__info__link'
                to='/cgu'
                target='_blank'
                rel='noopener noreferrer'
              >
                Conditions générales d'utilisation
              </Link>
            </div>
            <form
              className='createAccount__wrapper__form'
              onSubmit={handleSubmit}
            >
              <h2 className='createAccount__wrapper__form__title'>
                Formulaire à compléter
              </h2>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Votre pseudo
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border:
                        inputErrorUsername || usernameAlreadyExist
                          ? '4px solid red '
                          : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='text'
                    id='username'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('username')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'username' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Votre pseudo doit comporter entre 2 et 18 caractères.Il
                      doit commencer par une lettre et ne peut contenir que des
                      lettres ou des chiffres.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemples: Pseudo87 / Pseudo / Pseu87Do</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Votre email
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border:
                        inputErrorEmail || emailAlreadyExist
                          ? '4px solid red '
                          : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='email'
                    id='email'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('email')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'email' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Un email de confirmation vous sera envoyé après avoir
                      terminé votre inscription.
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Confirmer l'email
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    style={{
                      border: inputErrorEmailConfirm
                        ? '4px solid red '
                        : '4px solid rgb(50,50,50)',
                    }}
                    className='createAccount__wrapper__form__element__input'
                    type='email'
                    id='emailConfirm'
                    name='emailConfirm'
                    value={formValues.emailConfirm}
                    onChange={handleChange}
                  />
                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('emailConfirm')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display:
                        displayHelp === 'emailConfirm' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      L'adresse email de confirmation doit correspondre à
                      l'adresse email saisie précédemment, elle permet d'éviter
                      les erreurs de saisies.
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Votre mot de passe
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  {passwordVisibility ? (
                    <>
                      <input
                        style={{
                          border: inputErrorPassword
                            ? '4px solid red '
                            : '4px solid rgb(50,50,50)',
                        }}
                        className='createAccount__wrapper__form__element__input'
                        type='text'
                        id='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleChange}
                        autoComplete='new-password'
                      />
                      <Eye
                        className={
                          'createAccount__wrapper__form__element__inputWrapper__icon'
                        }
                        onClick={() => setPasswordVisibility(false)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        style={{
                          border: inputErrorPassword
                            ? '4px solid red '
                            : '4px solid rgb(50,50,50)',
                        }}
                        className='createAccount__wrapper__form__element__input'
                        type='password'
                        id='password'
                        name='password'
                        value={formValues.password}
                        onChange={handleChange}
                        autoComplete='new-password'
                      />
                      <EyeOff
                        className={
                          'createAccount__wrapper__form__element__inputWrapper__icon'
                        }
                        onClick={() => setPasswordVisibility(true)}
                      />
                    </>
                  )}

                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('password')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display: displayHelp === 'password' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Le mot de passe doit contenir{' '}
                      <strong>
                        au moins 8 caractères, une minuscule, une majuscule et
                        un chiffre
                      </strong>
                      .
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      Ajouter des caractères spéciaux est recommandé mais pas
                      obligatoire.
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      Évitez des mots de passe facile à trouver
                    </p>
                    <p className='createAccount__wrapper__info__text'>
                      <strong>exemple: Monmotdepasse87</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Confirmer le mot de passe
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  {passwordVisibility ? (
                    <>
                      <input
                        style={{
                          border: inputErrorPasswordConfirm
                            ? '4px solid red '
                            : '4px solid rgb(50,50,50)',
                        }}
                        className='createAccount__wrapper__form__element__input'
                        type='text'
                        id='passwordConfirm'
                        name='passwordConfirm'
                        value={formValues.passwordConfirm}
                        onChange={handleChange}
                        autoComplete='new-password'
                      />
                      <Eye
                        className={
                          'createAccount__wrapper__form__element__inputWrapper__icon'
                        }
                        onClick={() => setPasswordVisibility(false)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        style={{
                          border: inputErrorPasswordConfirm
                            ? '4px solid red '
                            : '4px solid rgb(50,50,50)',
                        }}
                        className='createAccount__wrapper__form__element__input'
                        type='password'
                        id='passwordConfirm'
                        name='passwordConfirm'
                        value={formValues.passwordConfirm}
                        onChange={handleChange}
                        autoComplete='new-password'
                      />
                      <EyeOff
                        className={
                          'createAccount__wrapper__form__element__inputWrapper__icon'
                        }
                        onClick={() => setPasswordVisibility(true)}
                      />
                    </>
                  )}

                  <span
                    className='createAccount__wrapper__form__element__help'
                    onMouseOver={() => setDisplayHelp('passwordConfirm')}
                    onMouseOut={() => setDisplayHelp('')}
                  >
                    ?
                  </span>
                  <div
                    style={{
                      display:
                        displayHelp === 'passwordConfirm' ? 'block' : 'none',
                    }}
                    className='createAccount__wrapper__form__element__help__content'
                  >
                    <p className='createAccount__wrapper__info__text'>
                      Le mot de passe de confirmation doit correspondre au mot
                      de passe saisi précédemment, il permet d'éviter les
                      erreurs de saisie.
                    </p>
                  </div>
                </div>
              </div>
              {formError && (
                <p className='createAccount__wrapper__form__error'>
                  {formError}
                </p>
              )}
              <div className='createAccount__wrapper__form__buttons'>
                <button
                  className='createAccount__wrapper__form__buttons__back'
                  type='button'
                  onClick={handleBack}
                >
                  Retour à la création du profil
                </button>
                <button
                  className='createAccount__wrapper__form__buttons__submit'
                  type='submit'
                >
                  Valider le formulaire
                </button>
              </div>
            </form>
          </>
        )}
        {/* FORM STEP THREE */}
        {currentStep === 3 && (
          <>
            <div className='createAccount__wrapper__info'>
              <h2 className='createAccount__wrapper__info__title'>
                Étape 3 / 3 : Récapitulatif
              </h2>
              <p className='createAccount__wrapper__info__text'>
                Votre compte utilisateur est désormais configuré. Vous pouvez
                vérifier vos saisies à l'aide du récapitulatif ci-dessous.
              </p>
              <p className='createAccount__wrapper__info__text'>
                Après avoir lu les{' '}
                <Link
                  to='/cgu'
                  className='createAccount__wrapper__info__link'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  conditions générales d'utilisation
                </Link>{' '}
                et vérification du récapitulatif, cliquez sur le bouton{' '}
                <strong>terminer mon inscription</strong> pour terminer le
                processus de création de compte.
              </p>
              <p className='createAccount__wrapper__info__text'>
                Vous recevrez un email de vérification de l'adresse email qui
                vous permettra de vous connecter et d'utiliser MealManager !
              </p>
              <p
                style={{ fontWeight: 'bold' }}
                className='createAccount__wrapper__info__text'
              >
                La réception du mail de vérification peut prendre quelques
                minutes
              </p>
            </div>
            <form
              className='createAccount__wrapper__form'
              onSubmit={handleSubmit}
            >
              <h2 className='createAccount__wrapper__form__title'>
                Récapitulatif des informations saisies
              </h2>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='age'
                >
                  Votre age
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    value={formValues.age}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='height'
                >
                  Votre taille
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    value={formValues.height}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='weight'
                >
                  Votre poids
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    value={formValues.weight}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='weight'
                >
                  Votre objectif
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='number'
                    value={formValues.goal}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='sex'
                >
                  Votre sexe
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='text'
                    value={formValues.sex}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='activity'
                >
                  Votre activité
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='text'
                    value={formValues.activity}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='activity'
                >
                  Votre pseudo
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='text'
                    value={formValues.username}
                    disabled
                  />
                </div>
              </div>
              <div className='createAccount__wrapper__form__element'>
                <label
                  className='createAccount__wrapper__form__element__label'
                  htmlFor='activity'
                >
                  Votre email
                </label>
                <div className='createAccount__wrapper__form__element__inputWrapper'>
                  <input
                    className='createAccount__wrapper__form__element__input'
                    type='text'
                    value={formValues.email}
                    disabled
                  />
                </div>
              </div>
              {formError && (
                <p className='createAccount__wrapper__form__error'>
                  {formError}
                </p>
              )}
              <div style={{ display: 'flex' }}>
                <input
                  onChange={() => SetIsChecked(!isChecked)}
                  type='checkbox'
                  name='checkbox'
                  style={{ marginRight: '.5rem' }}
                />
                <label
                  htmlFor='checkbox'
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  J'ai lu et j'accepte les
                  <Link
                    to='/cgu'
                    className='createAccount__wrapper__info__link'
                    style={{ color: 'white', marginLeft: '.4em' }}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    conditions générales d'utilisation
                  </Link>
                </label>
              </div>
              <div className='createAccount__wrapper__form__buttons'>
                <button
                  className='createAccount__wrapper__form__buttons__back'
                  type='button'
                  onClick={handleBack}
                >
                  Corriger mes saisies
                </button>
                {!errorMsg && (
                  <button
                    className='createAccount__wrapper__form__buttons__submit'
                    type='submit'
                  >
                    Je valide mon inscription
                  </button>
                )}
              </div>
            </form>
          </>
        )}
        {/* FORM STEP THREE */}
        {currentStep === 4 && (
          <>
            <div className='createAccount__wrapper__info'>
              <h2 className='createAccount__wrapper__info__title'>
                Votre inscription a bien été prise en compte et vos données ont
                été enregistrées.
              </h2>
              <p className='createAccount__wrapper__info__text'>
                Vous allez recevoir un mail dans quelques instants afin de
                valider votre adresse email.
              </p>
              <p className='createAccount__wrapper__info__text'>
                <strong>
                  Après avoir validé votre email vous pourrez vous connecter à
                  MealManager.
                </strong>
              </p>
              <p className='createAccount__wrapper__info__text'>
                En attendant l'arrivée du mail, vous pouvez consulter ci-dessous
                votre IMC, votre métabolisme de base et vos besoins journaliers.
                Ces derniers ont été calculés avec les informations que vous
                avez saisies lors de votre inscription. Ils vous serviront de
                repère pour vous aider à équilibrer votre alimentation et
                atteindre vos objectifs !
              </p>
              <p className='createAccount__wrapper__info__text'>
                A très vite sur MealManager !
              </p>
            </div>
            <div className='createAccount__wrapper__result'>
              <h2 className='createAccount__wrapper__result__title'>
                Résultats
              </h2>
              <div className='createAccount__wrapper__result__wrapper'>
                <fieldset className='createAccount__wrapper__result__wrapper__fieldset'>
                  <legend>IMC</legend>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div
                      style={{ margin: '0 auto' }}
                      className='createAccount__wrapper__result__wrapper__fieldset__element__value'
                    >
                      {imc}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div
                      style={{ margin: '0 auto' }}
                      className='createAccount__wrapper__result__wrapper__fieldset__element__value'
                    >
                      {IMCResult(imc)}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <Link
                      to='/imc/info'
                      target={'_blank'}
                      className='createAccount__wrapper__result__wrapper__fieldset__element__button'
                    >
                      en savoir plus
                    </Link>
                  </div>
                </fieldset>
                <fieldset className='createAccount__wrapper__result__wrapper__fieldset'>
                  <legend>Poids idéal</legend>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div
                      style={{ margin: '0 auto' }}
                      className='createAccount__wrapper__result__wrapper__fieldset__element__value'
                    >
                      {idealWeight + ' kg*'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Différence :
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {Math.abs(formValues.weight - idealWeight) + ' kg'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <Link
                      to='/idealWeight/info'
                      target={'_blank'}
                      className='createAccount__wrapper__result__wrapper__fieldset__element__button'
                    >
                      en savoir plus
                    </Link>
                  </div>
                </fieldset>
                <fieldset className='createAccount__wrapper__result__wrapper__fieldset'>
                  <legend>Métabolisme de base</legend>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Calories
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {bmr + ' kcal'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <button className='createAccount__wrapper__result__wrapper__fieldset__element__button'>
                      <Link
                        to='/bmr/info'
                        target={'_blank'}
                        className='createAccount__wrapper__result__wrapper__fieldset__element__button'
                      >
                        en savoir plus
                      </Link>
                    </button>
                  </div>
                </fieldset>
                <fieldset className='createAccount__wrapper__result__wrapper__fieldset'>
                  <legend>Besoins journaliers</legend>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Calories
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {dailies.calorie + ' Kcal'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Glucides
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {dailies.carbohydrate + ' g'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Protéines
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {dailies.protein + ' g'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Lipides
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {dailies.lipid + ' g'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__name'>
                      Fibres
                    </div>
                    <div className='createAccount__wrapper__result__wrapper__fieldset__element__value'>
                      {dailies.fiber + ' g'}
                    </div>
                  </div>
                  <div className='createAccount__wrapper__result__wrapper__fieldset__element'>
                    <button className='createAccount__wrapper__result__wrapper__fieldset__element__button'>
                      <Link
                        to='/dailies/info'
                        target={'_blank'}
                        className='createAccount__wrapper__result__wrapper__fieldset__element__button'
                      >
                        en savoir plus
                      </Link>
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className='createAccount__wrapper__info'>
              <p className='createAccount__wrapper__info__text'>
                <b>
                  N'oubliez pas de consulter vos mails pour confirmer votre
                  adresse email et enfin vous connecter à MealManager !
                </b>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    errorMsg: state.user.register.errorMsg,
    loading: state.user.loading,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateAccount);
