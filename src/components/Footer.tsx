import { Link } from 'react-router-dom';

import '../styles/footer.sass';

const Footer = () => {
  return (
    <footer className='footer'>
      <nav className='footer__navbar'>
        <ul className='footer__navbar__list'>
          <li className='footer__navbar__list__element'>
            <Link to='/cgu' className='footer__navbar__list__element__link'>
              CGU
            </Link>
          </li>
          <li className='footer__navbar__list__element'>Contact</li>
          <li className='footer__navbar__list__element'>À propos</li>
        </ul>
      </nav>
      <div className='footer__wrapper'>
        <span className='footer__wrapper__element'>
          Site réalisé par Juan5987
        </span>
      </div>
    </footer>
  );
};

export default Footer;
