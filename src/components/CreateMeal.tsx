import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { RootState } from '../state';
import { IMeal } from '../state/meal';
import { IIngredient } from '../state/meal';

import '../styles/create-meal.sass';

interface ICreateMealModal {
  meals: IMeal[];
  ingredients: IIngredient[];
}

const CreateMeal: React.FC<ICreateMealModal> = ({ meals, ingredients }) => {
  const userId = localStorage.getItem('id');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate: NavigateFunction = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<IIngredient[]>();
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [mealIngredients, setMealIngredients] = useState<IIngredient[] | []>(
    []
  );
  const [mealNutrition, setMealNutrition] = useState({
    calorie: 0,
    carbohydrate: 0,
    protein: 0,
    lipid: 0,
    fiber: 0,
  });
  const [mealName, setMealName] = useState('');
  const [isCreateIngredientModalOpen, setIsCreateIngredientModalOpen] =
    useState(false);
  const [newIngredient, setNewIngredient] = useState<IIngredient>({
    id: 0,
    name: '',
    quantity: 100,
    calorie: 0,
    carbohydrate: 0,
    protein: 0,
    lipid: 0,
    fiber: 0,
  });

  const handleChangeCreateIngredientModal = (e: any) => {
    setNewIngredient({
      ...newIngredient,
      [e.target.id]: e.target.value,
    });
  };

  const handleCancelCreateIngredientModal = (e: any) => {
    setIsCreateIngredientModalOpen(false);
    setNewIngredient({
      id: 0,
      name: '',
      quantity: 100,
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      lipid: 0,
      fiber: 0,
    });
  };

  const handleSubmitCreateIngredientModal = (e: any) => {
    e.preventDefault();
    setNewIngredient({
      id: 0,
      name: '',
      quantity: 100,
      calorie: 0,
      carbohydrate: 0,
      protein: 0,
      lipid: 0,
      fiber: 0,
    });

    setMealIngredients([
      ...mealIngredients,
      {
        id: 0,
        name: newIngredient.name,
        quantity: Number(newIngredient.quantity),
        calorie: Number(newIngredient.calorie),
        carbohydrate: Number(newIngredient.carbohydrate),
        protein: Number(newIngredient.protein),
        lipid: Number(newIngredient.lipid),
        fiber: Number(newIngredient.fiber),
      },
    ]);
    setIsCreateIngredientModalOpen(false);
  };

  const handleChangeSearchbar = (e: any) => {
    setIsResultOpen(true);
    setSearchValue(e.target.value);
    const result = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 1) setSearchResult(result);
    else setSearchResult([]);
  };

  const handleAddIngredient = (e: any) => {
    const newIngredient = searchResult?.find(
      (ingredient) => ingredient.name === e.target.innerText
    );

    if (
      newIngredient &&
      ![...mealIngredients].find(
        (mealIngredient) => mealIngredient.name === newIngredient.name
      )
    ) {
      setIsResultOpen(false);
      setSearchValue('');
      setMealIngredients([...mealIngredients, newIngredient]);
    }
  };

  const handleQuantityChange = (e: any) => {
    if (e.target.value !== '' && e.target.value > 0) {
      const updatedIngredients = mealIngredients.map((ingredient) => {
        if (ingredient.name === e.target.dataset.mealname) {
          return {
            ...ingredient,
            quantity: e.target.value,
            calorie:
              (ingredient.calorie / ingredient.quantity) * e.target.value,
            carbohydrate:
              (ingredient.carbohydrate / ingredient.quantity) * e.target.value,
            protein:
              (ingredient.protein / ingredient.quantity) * e.target.value,
            lipid: (ingredient.lipid / ingredient.quantity) * e.target.value,
            fiber: (ingredient.fiber / ingredient.quantity) * e.target.value,
          };
        } else return ingredient;
      });
      setMealIngredients(updatedIngredients);
    }
  };

  const handleDeleteIngredient = (e: any) => {
    const updatedIngredients = [...mealIngredients].filter(
      (ingredient) => ingredient.name !== e.target.dataset.mealname
    );

    setMealIngredients([...updatedIngredients]);
  };

  const handleAddNewIngredient = (e: any) => {
    setIsResultOpen(false);
    setSearchValue('');
    setIsCreateIngredientModalOpen(true);
  };

  useEffect(() => {
    let calories = 0;
    let carbohydrates = 0;
    let proteins = 0;
    let lipids = 0;
    let fibers = 0;

    for (let i = 0; i < mealIngredients.length; i++) {
      calories += mealIngredients[i].calorie;
      carbohydrates += mealIngredients[i].carbohydrate;
      proteins += mealIngredients[i].protein;
      lipids += mealIngredients[i].lipid;
      fibers += mealIngredients[i].fiber;
    }
    setMealNutrition({
      ...mealNutrition,
      calorie: calories,
      carbohydrate: carbohydrates,
      protein: proteins,
      lipid: lipids,
      fiber: fibers,
    });
  }, [mealIngredients]);

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
          value={searchValue}
          onChange={handleChangeSearchbar}
        />
        {isResultOpen && (
          <div className='createMeal__result'>
            {searchResult?.map((ingredient) => (
              <div
                className={
                  [...mealIngredients].find(
                    (mealIngredient) => mealIngredient.name === ingredient.name
                  )
                    ? 'createMeal__result__element createMeal__result__element__already'
                    : 'createMeal__result__element'
                }
                onMouseDown={handleAddIngredient}
                key={ingredient.name}
              >
                <div>{ingredient.name}</div>
                {[...mealIngredients].find(
                  (mealIngredient) => mealIngredient.name === ingredient.name
                ) && (
                  <div className='createMeal__result__element__already'>
                    Déjà ajouté
                  </div>
                )}
              </div>
            ))}
            {isResultOpen && searchValue.length > 0 && (
              <div
                className='createMeal__result__element createMeal__result__element--add'
                onClick={handleAddNewIngredient}
              >
                Pas dans la liste ? Ajoutez-le
              </div>
            )}
          </div>
        )}
      </div>
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
              {mealNutrition.calorie.toFixed(0)} Kcal
            </div>
          </div>
          <div className='createMeal__nutrition__values__element'>
            <div className='createMeal__nutrition__values__element__name'>
              Glucides
            </div>
            <div className='createMeal__nutrition__values__element__value'>
              {mealNutrition.carbohydrate.toFixed(1)} g
            </div>
          </div>
          <div className='createMeal__nutrition__values__element'>
            <div className='createMeal__nutrition__values__element__name'>
              Protéines
            </div>
            <div className='createMeal__nutrition__values__element__value'>
              {mealNutrition.protein.toFixed(1)} g
            </div>
          </div>
          <div className='createMeal__nutrition__values__element'>
            <div className='createMeal__nutrition__values__element__name'>
              Lipides
            </div>
            <div className='createMeal__nutrition__values__element__value'>
              {mealNutrition.lipid.toFixed(1)} g
            </div>
          </div>
          <div className='createMeal__nutrition__values__element'>
            <div className='createMeal__nutrition__values__element__name'>
              Fibres
            </div>
            <div className='createMeal__nutrition__values__element__value'>
              {mealNutrition.fiber.toFixed(1)} g
            </div>
          </div>
        </div>
      </div>
      <div className='createMeal__ingredients'>
        <div className='createMeal__ingredients__name'>
          <label
            className='createMeal__ingredients__name__label'
            htmlFor='mealName'
          >
            Nom du repas
          </label>
          <input
            className='createMeal__ingredients__name__input'
            type='text'
            id='mealName'
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>

        {mealIngredients.length > 0 ? (
          mealIngredients.map((ingredient) => (
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
                  <input
                    type='number'
                    value={ingredient.quantity}
                    className='createMeal__ingredients__ingredient__nutrition__element__input'
                    data-mealname={ingredient.name}
                    onChange={handleQuantityChange}
                  />
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='createMeal__ingredients__ingredient__nutrition__trash'
                  onClick={handleDeleteIngredient}
                  data-mealname={ingredient.name}
                >
                  <polyline
                    data-mealname={ingredient.name}
                    points='3 6 5 6 21 6'
                  ></polyline>
                  <path
                    data-mealname={ingredient.name}
                    d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'
                  ></path>
                  <line
                    data-mealname={ingredient.name}
                    x1='10'
                    y1='11'
                    x2='10'
                    y2='17'
                  ></line>
                  <line
                    data-mealname={ingredient.name}
                    x1='14'
                    y1='11'
                    x2='14'
                    y2='17'
                  ></line>
                </svg>
              </div>
            </div>
          ))
        ) : (
          <div className='createMeal__ingredients__empty'>
            Aucun ingrédient, ajoutez-en à l'aide de la barre de recherche
          </div>
        )}

        {mealIngredients.length > 0 && (
          <div className='createMeal__ingredients__buttons'>
            <button className='createMeal__ingredients__buttons__submit'>
              Enregistrer
            </button>
            <button
              type='submit'
              className='createMeal__ingredients__buttons__cancel'
              onClick={() => navigate('/meals')}
            >
              Annuler
            </button>
          </div>
        )}
      </div>
      {isCreateIngredientModalOpen && (
        <div
          className='createMeal__modal'
          onMouseDown={() => setIsCreateIngredientModalOpen(false)}
        >
          <div
            className='createMeal__modal__wrapper'
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 className='createMeal__modal__wrapper__title'>
              Création d'un aliment
            </h2>
            <form
              className='createMeal__modal__wrapper__form'
              onSubmit={handleSubmitCreateIngredientModal}
            >
              <div className='createMeal__modal__wrapper__form__element--name'>
                <label
                  htmlFor='name'
                  className='createMeal__modal__wrapper__form__element__label--name'
                >
                  Nom
                </label>
                <input
                  type='text'
                  id='name'
                  className='createMeal__modal__wrapper__form__element__input--name'
                  value={newIngredient.name}
                  onChange={handleChangeCreateIngredientModal}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <h3 className='createMeal__modal__wrapper__form__element__title'>
                  Valeurs nutritives
                </h3>
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='quantity'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Quantité (g)
                </label>
                <input
                  type='number'
                  id='quantity'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.quantity}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='calorie'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Calories (Kcal)
                </label>
                <input
                  type='number'
                  id='calorie'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.calorie}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='carbohydrate'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Glucides (g)
                </label>
                <input
                  type='number'
                  id='carbohydrate'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.carbohydrate}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='protein'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Protéines (g)
                </label>
                <input
                  type='number'
                  id='protein'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.protein}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='lipid'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Lipides (g)
                </label>
                <input
                  type='number'
                  id='lipid'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.lipid}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__element'>
                <label
                  htmlFor='fiber'
                  className='createMeal__modal__wrapper__form__element__label'
                >
                  Fibres (g)
                </label>
                <input
                  type='number'
                  id='fiber'
                  className='createMeal__modal__wrapper__form__element__input'
                  onChange={handleChangeCreateIngredientModal}
                  value={newIngredient.fiber}
                  required
                />
              </div>
              <div className='createMeal__modal__wrapper__form__buttons'>
                <button
                  type='submit'
                  className='createMeal__modal__wrapper__form__buttons__submit'
                >
                  Valider
                </button>
                <button
                  className='createMeal__modal__wrapper__form__buttons__cancel'
                  onMouseDown={handleCancelCreateIngredientModal}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
