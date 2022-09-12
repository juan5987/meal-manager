import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import { getMeals } from '../state/action-creators';
import { IMeal } from '../state/meal';

import '../styles/meal.sass';

interface Iprops {
  meal: IMeal;
}

const Meal: React.FC<Iprops> = (props) => {
  const userId = localStorage.getItem('id');
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = (e: any) => {
    setIsDeleteModalOpen(true);
    e.stopPropagation();
  };

  const handleViewDetails = () => {
    !isDeleteModalOpen && navigate(`/meal/${props.meal.id}`);
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    const mealId = e.target.dataset.id;

    axios({
      method: 'delete',
      url: `http://localhost:3001/delete/meal/${mealId}`,
    })
      .then((result) => {
        dispatch(getMeals(Number(userId)));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleModify = (e: any) => {
    e.stopPropagation();
    navigate(`/modify/meal/${props.meal.id}`);
  };

  return (
    <div className='meal' onClick={handleViewDetails}>
      {isDeleteModalOpen && (
        <div className='modal' onMouseDown={() => setIsDeleteModalOpen(false)}>
          <form
            className='meal__deleteModal'
            onSubmit={handleDelete}
            data-id={props.meal.id}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 className='meal__deleteModal__title'>
              Voulez-vous supprimer le repas ?
            </h2>
            <h3 className='meal__deleteModal__name'>{props.meal.name}</h3>
            <div className='meal__deleteModal__buttons'>
              <button className='meal__deleteModal__buttons__submit'>
                Oui
              </button>
              <button
                className='meal__deleteModal__buttons__cancel'
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
      <div className='meal__name'>
        {props.meal.name.length > 25
          ? props.meal.name.slice(0, 25) + '...'
          : props.meal.name}
      </div>
      <div className='meal__info'>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Création</div>
          <div className='meal__info__element__value'>
            {Moment(props.meal.updated_at).format('DD/MM/YYYY')}
          </div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Calories</div>
          <div className='meal__info__element__value'>
            {Math.round(props.meal.calorie)} Kcal
          </div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Glucides</div>
          <div className='meal__info__element__value'>
            {props.meal.carbohydrate} g
          </div>
        </div>
      </div>
      <div className='meal__info'>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Protéines</div>
          <div className='meal__info__element__value'>
            {props.meal.protein} g
          </div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Lipides</div>
          <div className='meal__info__element__value'>{props.meal.lipid} g</div>
        </div>
        <div className='meal__info__element'>
          <div className='meal__info__element__name'>Fibres</div>
          <div className='meal__info__element__value'>{props.meal.fiber} g</div>
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
            onClick={handleModify}
          >
            <path
              d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'
              onClick={handleModify}
            ></path>
            <path
              d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
              onClick={handleModify}
            ></path>
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
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
            onClick={handleOpenDeleteModal}
          >
            <polyline
              points='3 6 5 6 21 6'
              onClick={handleOpenDeleteModal}
            ></polyline>
            <path
              d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'
              onClick={handleOpenDeleteModal}
            ></path>
            <line
              x1='10'
              y1='11'
              x2='10'
              y2='17'
              onClick={handleOpenDeleteModal}
            ></line>
            <line
              x1='14'
              y1='11'
              x2='14'
              y2='17'
              onClick={handleOpenDeleteModal}
            ></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Meal;
