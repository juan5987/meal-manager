import React from 'react';

import '../styles/imc-info.sass';

const Bmr = () => {
  return (
    <div className='imcInfo'>
      <div className='imcInfo__wrapper'>
        <h2 className='imcInfo__wrapper__title'>Métabolisme de base</h2>
        <div className='imcInfo__wrapper__content'>
          <p className='imcInfo__wrapper__content__text'>
            <strong>Le métabolisme de base</strong> (ou métabolisme basal)
            correspond à la quantité de calories quotidienne nécessaire pour que
            le corps puisse fonctionner au repos.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            La formule utilisée pour calculer votre métabolisme de base en Kcal
            est celle de <strong>Black et al</strong> :
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <strong>Femme</strong>: 0,963 x <em>poids</em>
            <sup>0,48</sup> x <em>taille</em>
            <sup>0,50</sup> x <em>age</em>
            <sup>-0,13</sup> x (1000 / 4.1855)
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <strong>Homme</strong>: 1,083 x <em>poids</em>
            <sup>0,48</sup> x <em>taille</em>
            <sup>0,50</sup> x <em>age</em>
            <sup>-0,13</sup> x (1000 / 4.1855)
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Pour rester en bonne santé, il est déconseillé de consommer moins de
            calories que votre métabolisme de base.
          </p>
          <fieldset className='imcInfo__wrapper__content__fieldset'>
            <legend>Informations importante</legend>
            <p className='imcInfo__wrapper__content__fieldset__text'>
              MealManager est un outil qui calcule pour vous les différents
              éléments vous permettant d'améliorer vos habitudes alimentaires et
              de suivre l'évolution de votre alimentation et de votre poids.
              Pour cela, il utilise des formules célèbres telles que celles de
              Black et al (métabolisme de base) ou la formule de Lorentz (poids
              idéal) telles qu'elles le sont au moment durant lequel
              l'application est conçue.
            </p>
            <p className='imcInfo__wrapper__content__fieldset__text'>
              L'application n'a pas été conçue par des professionnels de la
              santé ou de la nutrition et n'a pas vocation à se substituer aux
              préconisations de votre médecin ou aux professionnels de santé.
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Bmr;
