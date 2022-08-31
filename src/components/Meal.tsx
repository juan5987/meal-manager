import React from 'react';
import '../styles/meal.sass';

interface Iprops {
  name: string;
}

const Meal = (props: Iprops) => {
  return (
    <div className='meal'>
      <div className='meal__name'>{props.name}</div>
      <div className='meal__info'>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Création</div>
          <div className='meal__info__element__value'> 31/08/2022</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Calories</div>
          <div className='meal__info__element__value'>1892 Kcal</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Glucides</div>
          <div className='meal__info__element__value'> 80 g</div>
        </div>
      </div>
      <div className='meal__info'>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Protéines</div>
          <div className='meal__info__element__value'>28 g</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Lipides</div>
          <div className='meal__info__element__value'> 12 g</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Fibres</div>
          <div className='meal__info__element__value'>11 g</div>
        </div>
      </div>
    </div>
  );
};

export default Meal;
