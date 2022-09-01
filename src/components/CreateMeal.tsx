import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../state';
import { IMeal } from '../state/meal';
import { IIngredient } from '../state/meal';

import '../styles/create-meal-modal.sass';

interface ICreateMealModal {
  meals: IMeal[];
  ingredients: IIngredient[];
}

const CreateMeal: React.FC<ICreateMealModal> = ({ meals, ingredients }) => {
  const userId = localStorage.getItem('id');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchResult, setSearchResult] = useState<IIngredient[]>();
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [mealIngredients, setMealIngredients] = useState<IIngredient[] | []>(
    []
  );

  const handleChangeSearchbar = (e: any) => {
    setIsResultOpen(true);
    const result = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 1) setSearchResult(result);
    else setSearchResult([]);
  };

  const handleAddIngredient = (e: any) => {
    setIsResultOpen(false);
    const newIngredient = searchResult?.find(
      (ingredient) => ingredient.name === e.target.innerText
    );
    newIngredient && setMealIngredients([...mealIngredients, newIngredient]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrorMsg('');

    const mealNameAlreadyExist = meals.find(
      (meal: IMeal) => meal.name === e.target.name.value
    );

    if (mealNameAlreadyExist) setErrorMsg('Un repas porte déjà ce nom');
    // else {
    //   axios({
    //     method: 'post',
    //     url: `http://localhost:3001/add/meal/${userId}`,
    //     data: {
    //       name: e.target.name.value,
    //       calorie: e.target.calorie.value,
    //       carbohydrate: e.target.carbohydrate.value,
    //       lipid: e.target.lipid.value,
    //       fiber: e.target.fiber.value,
    //       ingredients: [...ingredients],
    //     },
    //   });
    // }
  };

  return (
    <div className='createMeal'>
      <div className='background'></div>
      <h2 className='createMeal__title'>Création d'un repas</h2>
      <div className='createMeal__searchbar'>
        <label className='createMeal__searchbar__label' htmlFor='searchname'>
          Rechercher un aliment dans la base de données
        </label>
        <input
          className='createMeal__searchbar__input'
          type='text'
          id='searchname'
          placeholder="Saisir le nom d'un aliment"
          onChange={handleChangeSearchbar}
        />
        {isResultOpen && (
          <div className='createMeal__result'>
            {searchResult?.map((ingredient) => (
              <div
                className='createMeal__result__element'
                onMouseDown={handleAddIngredient}
                key={ingredient.name}
              >
                {ingredient.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='createMeal__ingredients'>
        {mealIngredients.map((ingredient) => (
          <div className='createMeal__ingredients__ingredient'>
            ingredient.name
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    meals: state.meals.userMeals,
    ingredients: state.meals.ingredients,
  };
};
const connector = connect(mapStateToProps);

export default connector(CreateMeal);
