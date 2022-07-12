import React from 'react';

import '../styles/imc-info.sass';

const IdealWeightInfo = () => {
  return (
    <div className='imcInfo'>
      <div className='imcInfo__wrapper'>
        <h2 className='imcInfo__wrapper__title'>
          Informations sur le poids idéal
        </h2>
        <div className='imcInfo__wrapper__content'>
          <p className='imcInfo__wrapper__content__text'>
            <strong>Le poids idéal</strong> (ou poids de santé) est calculé avec
            la <strong>formule de Lorentz</strong> qui est basée sur la taille
            et le sexe de l'individu.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Pour calculer votre poids idéal, selon votre sexe, voici les
            formules à utiliser:
          </p>
          <p
            style={{ textAlign: 'left', fontWeight: 'bold' }}
            className='imcInfo__wrapper__content__text'
          >
            Poids chez la femme = <em>Taille</em> (en cm) - 100 - ((
            <em>Taille</em> (en cm) - 150) /2,5 ).
          </p>
          <p
            style={{ textAlign: 'left', fontWeight: 'bold' }}
            className='imcInfo__wrapper__content__text'
          >
            Poids chez l'homme = <em>Taille</em> (en cm) - 100 - ((
            <em>Taille</em> (en cm) - 150) /4 ).
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Tout comme pour l'IMC, cette formule n'est pas parfaite puisqu'elle
            ne prend pas en compte les différentes morphologies, compositions
            corporelles etc. Néanmoins, elle vous permet d'avoir une idée
            approximative du poids cible que vous pourrez viser.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            De plus, bien que cette formule permet de définir un poids idéal ou
            poids de santé, il n'est pas impératif d'atteindre précisémment ce
            poids pour avoir une corpulence normale. Pour rappel, votre
            corpulence est considérée comme normale tant que votre IMC est
            compris entre 18,5 et 25
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

export default IdealWeightInfo;
