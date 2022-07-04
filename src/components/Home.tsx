import { Link } from 'react-router-dom';

import calculatorImg from '../images/home_calculator.png';
import planningImg from '../images/home_planning.png';
import dashboardImg from '../images/home_dashboard.png';
import Footer from './Footer';

import '../styles/home.sass';

const Home = () => {
  return (
    <div className='home'>
      <h1 className='home__title'>MealManager</h1>
      <h2 className='home__subtitle'>
        Votre gestionnaire de repas pour manger équilibré et suivre vos apports
        journaliers et l'évolution de votre poids
      </h2>
      <div className='home__wrapper__inscription'>
        <Link to='/register' className='home__wrapper__inscription__button'>
          Inscription
        </Link>
      </div>
      <div className='home__wrapper'>
        <div className='home__wrapper__image'>
          <img
            className='home__wrapper__image__src'
            src={calculatorImg}
            alt='calcaluteur'
            width='640'
            height='360'
          />
        </div>
        <div className='home__wrapper__description'>
          <h3 className='home__wrapper__description__title'>
            Calculateur de calories et plus encore
          </h3>
          <p className='home__wrapper__description__paragraph'>
            Créez vos repas selon vos besoins journaliers grâce à la fonction
            "mes repas" qui calcule pour vous le nombre de calories, glucides,
            protéines, lipides et fibres par repas, puis, trier les selon vos
            besoins.
          </p>
          <p className='home__wrapper__description__paragraph'>
            Si un aliment n'est pas dans la base de données, vous pourrez
            l'ajouter simplement et rapidement. Ainsi, mealManager se veut
            communautaire puisque chaque utilisateur contribue à l'amélioration
            des données accessibles dans l'application.
          </p>
          <p className='home__wrapper__description__paragraph'>
            Vos repas sont enregistrés dans notre base de données et seront
            accessibles dans votre planning. Facile, rapide et précis !
          </p>
        </div>
      </div>
      <div className='home__wrapper--light'>
        <div className='home__wrapper__description'>
          <h3 className='home__wrapper__description__title--dark'>
            Gérez votre planning de repas
          </h3>
          <p className='home__wrapper__description__paragraph'>
            La fonction "mon planning" vous permet d'organiser votre planning de
            repas en ajoutant des aliments pour les 3 repas de la journée et les
            collations. Les apports journaliers sont actualisés à chaque fois
            que vous ajouté un aliment ou un repas dans votre planning.
          </p>
          <p className='home__wrapper__description__paragraph'>
            Grâce aux apports journaliers cibles que vous aurez renseignés dans
            votre dashboard, vous pourrez organiser votre planning de repas afin
            de respecter les limites de calories, glucides, protéines, lipides
            et fibres que vous aurez choisis.
          </p>
        </div>
        <div className='home__wrapper__image'>
          <img
            className='home__wrapper__image__src'
            src={planningImg}
            alt='planning'
            width='880'
            height='410'
          />
        </div>
      </div>
      <div className='home__wrapper'>
        <img
          className='home__wrapper__image'
          src={dashboardImg}
          alt='apports journaliers'
          width='880'
          height='410'
        />

        <div className='home__wrapper__description'>
          <h3 className='home__wrapper__description__title'>
            Un dashboard pour organiser votre régime et suivre l'évolution de
            votre poids
          </h3>
          <h2 className='home__wrapper__description__subtitle'>
            Définissez vos apports journaliers
          </h2>
          <p className='home__wrapper__description__paragraph'>
            Grâce aux apports journaliers cibles que vous aurez renseignés dans
            votre dashboard, vous pourrez organiser votre planning de repas afin
            de respecter les limites de calories, glucides, protéines, lipides
            et fibres que vous aurez choisis.
          </p>
          <h2 className='home__wrapper__description__subtitle'>
            Actualiser votre poids et votre objectif actuel
          </h2>
          <p className='home__wrapper__description__paragraph'>
            A chaque pesée, renseignez votre poids dans votre dashboard pour
            pouvoir suivre son évolution. Si votre premier objectif de poids est
            atteint, vous pouvez entamer une phase de stabilisation ou définir
            un nouvel objectif à tout moment.
          </p>
          <h2 className='home__wrapper__description__subtitle'>
            Suivez l'évolution de votre poids
          </h2>
          <p className='home__wrapper__description__paragraph'>
            Grâce à notre graphique, vous pourrez suivre l'évolution de votre
            poids sur un mois ou une année. Le graphique s'actualise à chaque
            fois que vous ajouté un poids dans votre dashboard.
          </p>
        </div>
      </div>
      <div className='home__wrapper__inscription'>
        <h2 className='home__wrapper__inscription__title'>
          Prêt à essayer MealManager ?
        </h2>
        <p className='home__wrapper__inscription__paragraph'>
          Créer un compte rapidement en cliquant sur le bouton ci-dessous:
        </p>
        <Link to='/register' className='home__wrapper__inscription__button'>
          Inscription
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
