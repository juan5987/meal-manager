import React from 'react';
import { Edit, Trash2, Eye } from 'react-feather';
import '../styles/meal.sass';

interface Iprops {
  name: string;
  calorie: number;
  carbohydrate: number;
  protein: number;
  lipid: number;
  fiber: number;
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
          <div className='meal__info__element__value'>{props.calorie} Kcal</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Glucides</div>
          <div className='meal__info__element__value'>
            {props.carbohydrate} g
          </div>
        </div>
      </div>
      <div className='meal__info'>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Protéines</div>
          <div className='meal__info__element__value'>{props.protein} g</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Lipides</div>
          <div className='meal__info__element__value'>{props.lipid} g</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Fibres</div>
          <div className='meal__info__element__value'>{props.fiber} g</div>
        </div>
      </div>
      <div className='meal__buttons'>
        <div className='meal__buttons__button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='meal__buttons__button'
          >
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
            <circle cx='12' cy='12' r='3'></circle>
          </svg>
        </div>
        <div className='meal__buttons__button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2.2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
          </svg>
        </div>
        <div className='meal__buttons__button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2.2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <polyline points='3 6 5 6 21 6'></polyline>
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
            <line x1='10' y1='11' x2='10' y2='17'></line>
            <line x1='14' y1='11' x2='14' y2='17'></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Meal;
