import React from 'react';

import '../styles/create-meal-modal.sass';

interface Iprops {
  showModal: (bool: boolean) => void;
}

const CreateMealModal = (props: Iprops) => {
  return (
    <div className='modal' onMouseDown={() => props.showModal(false)}>
      <form
        className='modal__container'
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h1 className='modal__container__title'>Création d'un repas</h1>
        <div className='modal__container__wrapper'>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='name'
            >
              Nom
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='text'
              id='name'
              required
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='quantity'
            >
              Quantités
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='quantity'
              min={0}
              required
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='calorie'
            >
              Calories
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='calorie'
              min={0}
              required
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='carbohydrate'
            >
              Glucides
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='carbohydrate'
              min={0}
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='protein'
            >
              Protéines
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='protein'
              min={0}
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='lipid'
            >
              Lipides
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='lipid'
              min={0}
            />
          </div>
          <div className='modal__container__wrapper__field'>
            <label
              className='modal__container__wrapper__field__label'
              htmlFor='fiber'
            >
              Fibres
            </label>
            <input
              className='modal__container__wrapper__field__input'
              type='number'
              id='fiber'
              min={0}
            />
          </div>
        </div>
        <div className='modal__container__wrapper__buttons'>
          <button
            className='modal__container__wrapper__buttons__submit'
            type='submit'
          >
            Enregistrer
          </button>
          <button
            className='modal__container__wrapper__buttons__back'
            type='button'
            onClick={() => props.showModal(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMealModal;
