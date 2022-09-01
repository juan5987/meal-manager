import React from 'react';
import { RootState } from '../state';
import { AppDispatch } from '../state/store';
import { connect, ConnectedProps } from 'react-redux';

import Meal from './Meal';

import '../styles/meals.sass';

interface IMeals extends PropsFromRedux {}

const Meals: React.FC<IMeals> = ({ meals }) => {
  return (
    <div className='meals'>
      <div className='meals__meals'>
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
          </div>
          <div className='meals__wrapper__add'>
            <button className='meals__wrapper__add__button'>
              + Ajouter un repas
            </button>
          </div>
        </div>
        <div className='meals__meals__wrapper'>
          {meals.map((meal) => {
            if (meal.name.length > 25) {
              return <Meal name={meal.name.slice(0, 25) + '...'} />;
            } else {
              return <Meal name={meal.name} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    meals: state.meals.userMeals,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Meals);
