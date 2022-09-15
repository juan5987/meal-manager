import React, { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../state';
import { AppDispatch } from '../state/store';
import { IMeal } from '../state/meal';
import { getIngredients, getMeals } from '../state/action-creators';

import Meal from './Meal';
import { sortByProperty } from '../utils/sort';

import '../styles/meals.sass';

interface IMeals extends PropsFromRedux {}

const Meals: React.FC<IMeals> = ({ meals }) => {
  const dispatch = useDispatch();
  const userId = Number(localStorage.getItem('id'));
  const [filteredMeals, setfilteredMeals] = useState<IMeal[]>([...meals]);
  const sortValue: any = useRef();
  const orderValue: any = useRef();
  const [showCreateMealModal, setShowCreateMealModal] =
    useState<boolean>(false);

  useEffect(() => {
    setfilteredMeals([...meals]);
  }, [meals]);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getMeals(userId));
  }, []);

  const handleSortMeals = () => {
    const updatedMeals = [...filteredMeals].sort(
      sortByProperty(sortValue.current.value, orderValue.current.value)
    );
    updatedMeals && setfilteredMeals(updatedMeals);
    console.log(sortValue.current);
  };

  const handleSearchByName = (e: { target: { value: string } }) => {
    const updatedMeals = [...meals].filter((meal: IMeal) =>
      meal.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilteredMeals(updatedMeals);
  };

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
                ref={sortValue}
                onChange={handleSortMeals}
              >
                <option
                  className='meals__wrapper__filters__filter__option'
                  value='updated_at'
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
                ref={orderValue}
                onChange={handleSortMeals}
              >
                <option
                  className='meals__wrapper__filters__order__option'
                  value='ascending'
                >
                  Croissant
                </option>
                <option
                  className='meals__wrapper__filters__order__option'
                  value='descending'
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
                  onChange={handleSearchByName}
                />
              </div>
            </div>
          </div>
          <div className='meals__wrapper__add'>
            <Link
              to='/create/meal'
              className='meals__wrapper__add__button'
              onClick={() => setShowCreateMealModal(true)}
            >
              + Ajouter un repas
            </Link>
          </div>
        </div>
        {filteredMeals.length > 0 && (
          <div className='meals__meals__info'>
            Cliquez sur un repas pour voir plus détails
          </div>
        )}
        <div className='meals__meals__wrapper'>
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal: IMeal) => (
              <Meal meal={meal} key={meal.name} />
            ))
          ) : (
            <p className='meals__meals__wrapper__nomeal'>
              Aucun repas enregistré
            </p>
          )}
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
