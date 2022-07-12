import React from 'react';

import '../styles/imc-info.sass';

const ImcInfo = () => {
  return (
    <div className='imcInfo'>
      <div className='imcInfo__wrapper'>
        <h2 className='imcInfo__wrapper__title'>Informations sur l'IMC</h2>
        <div className='imcInfo__wrapper__content'>
          <p className='imcInfo__wrapper__content__text'>
            <strong>L'indice de masse corporelle</strong>
            (IMC) est calculé à partir de votre taille et de votre poids. Il est
            utilisé dans le diagnostic clinique de l'obésité et permet d'estimer
            la masse grasse d'un individu.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Pour calculer l'IMC, il faut diviser le poids en kg par la taille en
            mètres au carré.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <strong> IMC </strong>= <em>poids</em>(kg) / (<em>taille</em>(m) *{' '}
            <em>taille</em>(m))
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <strong>
              La valeur de référence, considérée comme la norme, se situe entre
              18,5 et 25
            </strong>
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Attention, l'IMC ne prenant en compte, ni la composition corporelle
            (masse musculaire ou grasse...),ni l’ossature, ni la répartition du
            tissu adipeux (endroit du corps où se trouve le masse grasse), les
            risques de complication liés à l'IMC peuvent changer d'un individu à
            l'autre. Par exemple, un individu sportif aura un IMC élevé sans
            pour autant présenter d'excès de masse grasse.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Pour en savoir plus sur l'IMC et plus généralement sur l'obésité,
            vous pouvez consulter le site de l'Inserm en cliquant sur le lien
            suivant:{' '}
            <a
              target='blank'
              href="https://www.inserm.fr/dossier/obesite/#:~:text=L'IMC%20correspond%20au%20poids,dans%20les%20carnets%20de%20sant%C3%A9."
            >
              lien vers le site de l'Inserm
            </a>
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

export default ImcInfo;
