import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../state';
import { IIngredient, IMeal } from '../state/meal';

interface IMealModify {
  meals: IMeal[];
  ingredients: IIngredient[];
}

const MealModify: React.FC<IMealModify> = ({ meals, ingredients }) => {
  const navigate: NavigateFunction = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
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
    setErrorMsg('');
    setNewIngredient({
      ...newIngredient,
      [e.target.id]: e.target.value,
    });
  };

  const handleCancelCreateIngredientModal = (e: any) => {
    setErrorMsg('');
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

  const handleChangeSearchbar = (e: any) => {
    setIsResultOpen(true);
    setSearchValue(e.target.value);
    setErrorMsg('');
    const result = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length > 1) setSearchResult(result);
    else setSearchResult([]);
  };

  const handleAddIngredient = (e: any) => {
    setErrorMsg('');
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
    setErrorMsg('');
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
    setErrorMsg('');
    const updatedIngredients = [...mealIngredients].filter(
      (ingredient) => ingredient.name !== e.target.dataset.mealname
    );

    setMealIngredients([...updatedIngredients]);
  };

  const handleAddNewIngredient = (e: any) => {
    setIsResultOpen(false);
    setSearchValue('');
    setErrorMsg('');
    setIsCreateIngredientModalOpen(true);
  };

  const handleSubmit = (e: any) => {};

  const handleSubmitCreateIngredientModal = (e: any) => {};

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

  return (
    <div className='createMeal'>
      <div className='background'></div>
      <h2 className='createMeal__title'>Modification d'un repas</h2>
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
      <form className='createMeal__ingredients' onSubmit={handleSubmit}>
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
            required
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
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
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

        {errorMsg && (
          <div className='createMeal__ingredients__errorMsg'>{errorMsg}</div>
        )}

        {mealIngredients.length > 0 && (
          <div className='createMeal__ingredients__buttons'>
            <button
              type='submit'
              className='createMeal__ingredients__buttons__submit'
            >
              Enregistrer
            </button>
            <button
              type='button'
              className='createMeal__ingredients__buttons__cancel'
              onClick={() => navigate('/meals')}
            >
              Annuler
            </button>
          </div>
        )}
      </form>
      {isCreateIngredientModalOpen && (
        <div className='createMeal__modal'>
          <h2 className='createMeal__modal__title'>Création d'un aliment</h2>
          <div className='createMeal__modal__wrapper'>
            <form
              className='createMeal__modal__wrapper__form'
              onSubmit={handleSubmitCreateIngredientModal}
            >
              <div className='createMeal__modal__wrapper__form__element--name'>
                <label
                  htmlFor='name'
                  className='createMeal__modal__wrapper__form__element__label--name'
                >
                  Nom de l'aliment
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
              <div className='createMeal__modal__wrapper__form__info'>
                <p className='createMeal__modal__wrapper__form__info__content'>
                  Complétez les valeurs nutritives telles qu'elles sont
                  indiquées sur l'emballage. Vous pourrez modifier la quantité
                  pour votre repas une fois l'aliment créé
                </p>
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
                  min={0}
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
                  min={0}
                  step={0.1}
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
                  min={0}
                  step={0.1}
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
                  min={0}
                  step={0.1}
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
                  min={0}
                  step={0.1}
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
                  min={0}
                  step={0.1}
                  required
                />
              </div>
              {errorMsg && (
                <p className='createMeal__modal__wrapper__form__errorMsg'>
                  {errorMsg}
                </p>
              )}
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

export default connector(MealModify);
