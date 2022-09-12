import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../state';
import { IMeal } from '../state/meal';

interface IMealDetails extends PropsFromRedux {}

const MealDetails: React.FC<IMealDetails> = ({ meals }) => {
  const navigate: NavigateFunction = useNavigate();
  const mealId = useParams().id;
  const [clickedMeal, setClickedMeal] = useState<IMeal>();

  const handleBackToMeals = (e: any) => {
    e.preventDefault();
    navigate('/meals');
  };

  useEffect(() => {
    setClickedMeal(
      [...meals].find((meal) => Number(meal.id) === Number(mealId))
    );
  }, []);

  return (
    <div className='createMeal'>
      <div className='background'></div>
      <h2 className='createMeal__title'>{clickedMeal && clickedMeal.name}</h2>
      {clickedMeal && (
        <div className='createMeal__nutrition'>
          <h2 className='createMeal__nutrition__title'>
            Valeur nutritive du repas
          </h2>
          <div className='createMeal__nutrition__values'>
            <div className='createMeal__nutrition__values__element'>
              <div className='createMeal__nutrition__values__element__name'>
                Calories
              </div>
              <div className='createMeal__nutrition__values__element__value'>
                {clickedMeal.calorie.toFixed(0)} Kcal
              </div>
            </div>
            <div className='createMeal__nutrition__values__element'>
              <div className='createMeal__nutrition__values__element__name'>
                Glucides
              </div>
              <div className='createMeal__nutrition__values__element__value'>
                {clickedMeal.carbohydrate.toFixed(1)} g
              </div>
            </div>
            <div className='createMeal__nutrition__values__element'>
              <div className='createMeal__nutrition__values__element__name'>
                Protéines
              </div>
              <div className='createMeal__nutrition__values__element__value'>
                {clickedMeal.protein.toFixed(1)} g
              </div>
            </div>
            <div className='createMeal__nutrition__values__element'>
              <div className='createMeal__nutrition__values__element__name'>
                Lipides
              </div>
              <div className='createMeal__nutrition__values__element__value'>
                {clickedMeal.lipid.toFixed(1)} g
              </div>
            </div>
            <div className='createMeal__nutrition__values__element'>
              <div className='createMeal__nutrition__values__element__name'>
                Fibres
              </div>
              <div className='createMeal__nutrition__values__element__value'>
                {clickedMeal.fiber.toFixed(1)} g
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='createMeal__ingredients'>
        <h2 className='createMeal__ingredients__title'>Aliments</h2>
        {clickedMeal && clickedMeal?.ingredients.length > 0 ? (
          clickedMeal?.ingredients.map((ingredient) => (
            <div
              className='createMeal__ingredients__ingredient'
              key={ingredient.name}
            >
              <div className='createMeal__ingredients__ingredient__name'>
                {ingredient.name}
              </div>
              <div className='createMeal__ingredients__ingredient__nutrition'>
                <div
                  className='createMeal__ingredients__ingredient__nutrition__element'
                  style={{ width: '90px' }}
                >
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Quantité (g)
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.quantity.toFixed(0)}
                  </div>
                </div>
                <div className='createMeal__ingredients__ingredient__nutrition__element'>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Kcal
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.calorie.toFixed(0)}
                  </div>
                </div>
                <div className='createMeal__ingredients__ingredient__nutrition__element'>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Glucides
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.carbohydrate.toFixed(1)} g
                  </div>
                </div>
                <div className='createMeal__ingredients__ingredient__nutrition__element'>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Protéines
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.protein.toFixed(1)} g
                  </div>
                </div>
                <div className='createMeal__ingredients__ingredient__nutrition__element'>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Lipides
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.lipid.toFixed(1)} g
                  </div>
                </div>
                <div className='createMeal__ingredients__ingredient__nutrition__element'>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__name'>
                    Fibres
                  </div>
                  <div className='createMeal__ingredients__ingredient__nutrition__element__value'>
                    {ingredient.fiber.toFixed(1)} g
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='createMeal__ingredients__empty'>repas non trouvé</div>
        )}
        <button
          className='createMeal__ingredients__button'
          onClick={handleBackToMeals}
        >
          Retourner à mes repas
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    meals: state.meals.userMeals,
  };
};

type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps);

export default connector(MealDetails);
