import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import '../styles/register-confirm.sass';

const RegisterConfirmation = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState();
  const { code } = useParams();

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:3001/confirmation/${code}`,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccessMsg(response.data.message);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(
          'Pas de réponse du serveur, veuillez contacter un administrateur'
        );
      });
  }, []);

  return (
    <div className='registerConfirm'>
      <div className='registerConfirm__wrapper'>
        <h2 className='registerConfirm__wrapper__title'>
          Confirmation d'inscription
        </h2>
        {error && (
          <>
            <p className='registerConfirm__wrapper__error'>{error}</p>
          </>
        )}
        {successMsg && (
          <>
            <p className='registerConfirm__wrapper__success'>{successMsg}</p>
            <Link to='/login' className='registerConfirm__wrapper__link'>
              Me connecter
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterConfirmation;
