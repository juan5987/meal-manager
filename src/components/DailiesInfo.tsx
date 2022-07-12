import React from 'react';

const DailiesInfo = () => {
  return (
    <div className='imcInfo'>
      <div className='imcInfo__wrapper'>
        <h2 className='imcInfo__wrapper__title'>
          Informations les besoins journaliers
        </h2>
        <div className='imcInfo__wrapper__content'>
          <p className='imcInfo__wrapper__content__text'>
            <strong>Les besoins journaliers</strong> (ou besoins nutritionnels
            ou besoins énergétiques...) correspondent à la quantité de calories
            et de nutriments devant être absorbés chaque jour.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Ils sont calculés à partir du métabolisme de base sur lequel est
            appliqué un coefficient selon l'activité physique de l'individu.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Il est important de noter que l'IMC et le métabolisme de base ne
            sont pas parfaits car ils ne prennent pas en compte des informations
            telles que la morpholohie, la répartition du tissu adipeux ou encore
            la composition corporelle. Par conséquent, les besoins journaliers
            peuvent également fluctuer selon les individus.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Si vous consommez plus de calories que vos besoins journaliers, vous
            prendrez du poids. Au contraire, si vous en consommez moins, vous
            perdrez du poids.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Attention toutefois de ne pas baisser trop radicalement l'apport en
            calories et nutriments au risque de créer des carences et donc
            d'engendrer des problèmes de santé pouvant être plus ou moins
            graves.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <b>
              En cas de doute, consulter votre médecin ou un professionnel de la
              nutrition.
            </b>
          </p>
          <p className='imcInfo__wrapper__content__text'>
            En se basant sur l'avis scientifique de l'
            <strong>agence européenne concernant l'alimentation</strong> (EFSA),
            MealManager a choisi la répartition <b>par défaut</b> des apports en
            glucide, protéines, lipides et fibres suivantes:
            <ul className='imcInfo__wrapper__content__list'>
              <li className='imcInfo__wrapper__content__text'>
                50% pour les glucides
              </li>
              <li className='imcInfo__wrapper__content__text'>
                15 % pour les protéines
              </li>
              <li className='imcInfo__wrapper__content__text'>
                35% pour les lipides
              </li>
              <li className='imcInfo__wrapper__content__text'>
                25 g pour les fibres
              </li>
            </ul>
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Ces valeurs varieront selon le profil de l'utilisateur, notamment
            selon son activité physique et le type de régime alimentaire choisi
            par ce dernier.
          </p>
          <p className='imcInfo__wrapper__content__text'>
            <b>
              Dans ce but, les valeurs par défaut pourront être modifiées à tous
              moment par l'utilisateur. En modifiant la répartition (les %), ou
              directement la valeur de chaque nutriment.
            </b>
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Enfin, l'alimentation ne se limite pas au calories, glucides,
            protéines, lipides et fibres. Il exite évidemment d'autres apports
            tels que les vitamines, les oligo-éléments, les minéraux etc...
          </p>
          <p className='imcInfo__wrapper__content__text'>
            Étant donné la compléxité du sujet, MealManager a fait le choix de
            se limiter à ses 5 éléments qui seront déjà un excellent départ pour
            apprendre à mieux manger.
          </p>
          <fieldset className='imcInfo__wrapper__content__fieldset'>
            <legend>Informations importante</legend>
            <p className='imcInfo__wrapper__content__fieldset__text'>
              MealManager est un outil qui calcule pour vous les différents
              éléments vous permettant d'améliorer vos habitudes alimentaires et
              de suivre l'évolution de votre alimentation et de votre poids.
              Pour cela, il utilise des formules célèbres telles que celle de
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

export default DailiesInfo;
