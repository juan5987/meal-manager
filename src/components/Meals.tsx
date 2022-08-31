import React from 'react';

import Meal from './Meal';

import '../styles/meals.sass';

const Meals = () => {
  return (
    <div className='meals'>
      <h1 className='meals__title'>Mes repas</h1>
      <div className='meals__wrapper'>
        <div className='meals__wrapper__filters'>
          <div className='meals__wrapper__filters__wrapper'>
            <label
              className='meals__wrapper__filters__wrapper__label'
              htmlFor='filter'
            >
              Filtre
            </label>
            <select
              className='meals__wrapper__filters__filter'
              name='filter'
              id='filter'
            >
              <option
                className='meals__wrapper__filters__filter__option'
                value='date'
              >
                Date de création
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='calorie'
              >
                Calories
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='name'
              >
                Nom
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='protein'
              >
                Protéines
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='carbohydrate'
              >
                Glucides
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='lipid'
              >
                Lipides
              </option>
              <option
                className='meals__wrapper__filters__filter__option'
                value='fiber'
              >
                Fibres
              </option>
            </select>
          </div>
          <div className='meals__wrapper__filters__wrapper'>
            <label
              className='meals__wrapper__filters__wrapper__label'
              htmlFor='order'
            >
              Ordre
            </label>
            <select
              className='meals__wrapper__filters__order'
              name='order'
              id='order'
            >
              <option
                className='meals__wrapper__filters__order__option'
                value='increase'
              >
                Croissant
              </option>
              <option
                className='meals__wrapper__filters__order__option'
                value='decrease'
              >
                Décroissant
              </option>
            </select>
          </div>
          <div className='meals__wrapper__filters__searchbar'>
            <div className='meals__wrapper__filters__wrapper'>
              <label
                className='meals__wrapper__filters__wrapper__label'
                htmlFor='searchbar'
              >
                Recherche
              </label>
              <input
                className='meals__wrapper__filters__searchbar__input'
                type='text'
                id='searchbar'
                name='searchbar'
                placeholder='Rechercher un repas'
              />
            </div>
          </div>
          <button className='meals__wrapper__filters__searchbar__button'>
            Valider
          </button>
        </div>
        <div className='meals__wrapper__add'>
          <button className='meals__wrapper__add__button'>
            Ajouter un repas
          </button>
        </div>
      </div>
      <div className='meals__meals'>
        <div className='meals__meals__wrapper'>
          <Meal name='Poulets aux poivrons' />
          <Meal name='Poulets curry' />
          <Meal name='Couscous au poulet' />
          <Meal name='Salade de thon' />
          <Meal name='Steak, riz, haricots verts' />
          <Meal name='Pâtes bolognaises' />
          <Meal name='Chili con carne' />
          <Meal name='Oeufs sur le plat' />
        </div>
      </div>
    </div>
  );
};

export default Meals;
