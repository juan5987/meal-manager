import React, { useState } from 'react';
import '../styles/create-account.sass';
import Footer from './Footer';

const CreateAccount = () => {
  let [displayAgeHelp, setDisplayAgeHelp] = useState<'block' | 'none'>('none');
  let [displayHeightHelp, setDisplayHeightHelp] = useState<'block' | 'none'>(
    'none'
  );
  let [displayWeightHelp, setDisplayWeightHelp] = useState<'block' | 'none'>(
    'none'
  );
  let [displaySextHelp, setDisplaySextHelp] = useState<'block' | 'none'>(
    'none'
  );
  let [displayActivitytHelp, setDisplayActivitytHelp] = useState<
    'block' | 'none'
  >('none');

  let [formValues, setFormValues] = useState({
    age: 0,
    height: 0,
    weight: 0,
    sex: 'Femme',
    activity: 'Sédentaire',
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className='createAccount'>
      <div className='createAccount__wrapper'>
        <h2 className='createAccount__wrapper__title'>
          Bonjour et bienvenue sur MealManager
        </h2>
        <div className='createAccount__wrapper__info'>
          <h3 className='createAccount__wrapper__info__title'>
            Création d'un profil utilisateur
          </h3>
          <p className='createAccount__wrapper__info__text'>
            Afin de créer votre profil et de calculer vos besoins journaliers et
            votre indice de masse corporelle, nous avons besoin de quelques
            informations.
          </p>
          <p className='createAccount__wrapper__info__text'>
            Ces informations sont indispensables pour pouvoir initialiser votre
            profil et vous permettre de suivre l'évolution de votre poids et de
            vos besoins journaliers.
          </p>
          <p className='createAccount__wrapper__info__text'>
            <strong>
              La création de votre profil devrait prendre moins de 3 minutes
            </strong>
          </p>
        </div>
        <form className='createAccount__wrapper__form' onSubmit={handleSubmit}>
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
                className='createAccount__wrapper__form__element__input'
                type='number'
                id='age'
                name='age'
                value={formValues.age}
              />
              <span
                className='createAccount__wrapper__form__element__help'
                onMouseOver={() => setDisplayAgeHelp('block')}
                onMouseOut={() => setDisplayAgeHelp('none')}
              >
                ?
              </span>
              <div
                style={{ display: displayAgeHelp }}
                className='createAccount__wrapper__form__element__help__content'
              >
                <p>
                  Votre age <strong>en années</strong> avec des caractères
                  numériques.
                </p>
                <p>
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
                className='createAccount__wrapper__form__element__input'
                type='number'
                id='height'
                name='height'
                value={formValues.height}
              />
              <span
                className='createAccount__wrapper__form__element__help'
                onMouseOver={() => setDisplayHeightHelp('block')}
                onMouseOut={() => setDisplayHeightHelp('none')}
              >
                ?
              </span>
              <div
                style={{ display: displayHeightHelp }}
                className='createAccount__wrapper__form__element__help__content'
              >
                <p>
                  Votre taille <strong>en centimètres</strong> avec des
                  caractères numériques.
                </p>
                <p>
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
                className='createAccount__wrapper__form__element__input'
                type='number'
                id='weight'
                name='weight'
                value={formValues.weight}
              />
              <span
                className='createAccount__wrapper__form__element__help'
                onMouseOver={() => setDisplayWeightHelp('block')}
                onMouseOut={() => setDisplayWeightHelp('none')}
              >
                ?
              </span>
              <div
                style={{ display: displayWeightHelp }}
                className='createAccount__wrapper__form__element__help__content'
              >
                <p>
                  Votre poids <strong>en kilos</strong> avec des caractères
                  numériques. Utilisez un point si la valeur est décimale.
                </p>
                <p>
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
              >
                <option
                  className='createAccount__wrapper__form__element__input'
                  value='Homme'
                >
                  Femme
                </option>
                <option
                  className='createAccount__wrapper__form__element__input'
                  value='Femme'
                >
                  Homme
                </option>
              </select>
              <span
                className='createAccount__wrapper__form__element__help'
                onMouseOver={() => setDisplaySextHelp('block')}
                onMouseOut={() => setDisplaySextHelp('none')}
              >
                ?
              </span>
              <div
                style={{ display: displaySextHelp }}
                className='createAccount__wrapper__form__element__help__content'
              >
                <p>
                  La formule de Black et al pour calculer le métaboslime de
                  repos prend en compte le sexe dans son calcul. Il s'agit ici
                  du <strong> sexe d'un point de vue anatomique.</strong>
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
                onMouseOver={() => setDisplayActivitytHelp('block')}
                onMouseOut={() => setDisplayActivitytHelp('none')}
              >
                ?
              </span>
              <div
                style={{ display: displayActivitytHelp }}
                className='createAccount__wrapper__form__element__help__content'
              >
                <p>
                  Selon votre activité, vos besoins journaliers seront plus ou
                  moins important.
                </p>
                <p>
                  <strong>Sédentaire:</strong> travail de bureau avec faible
                  activité physique
                </p>
                <p>
                  <strong>Activité légère:</strong> activité physique 1 à 3 fois
                  par semaine
                </p>
                <p>
                  <strong>Activité modérée:</strong> activité physique 4 à 6
                  fois par semaine
                </p>
                <p>
                  <strong>Activité intense:</strong> activité physique plus de 6
                  fois par semaine
                </p>
              </div>
            </div>
          </div>
          <button
            className='createAccount__wrapper__form__submit'
            type='submit'
          >
            Valider le formulaire
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
