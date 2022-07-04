import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../state';
import { AppDispatch } from '../state/store';
import '../styles/header.sass';

interface IHeader extends PropsFromRedux {}

const Header: React.FC<IHeader> = ({ isLogged, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <header className='header'>
      <h1 className='header__title'>MealManager</h1>
      {width < 830 ? (
        <>
          <div onClick={handleToggleMenu} className='header__hamburger'>
            <div className='header__hamburger__bar'></div>
            <div className='header__hamburger__bar'></div>
            <div className='header__hamburger__bar'></div>
          </div>
          {isOpen && (
            <nav className='header__navbar'>
              <ul className='header__list'>
                <li className='header__navbar__list__element'>
                  <Link
                    onClick={handleClick}
                    className='header__navbar__list__element__link'
                    to='/home'
                  >
                    Accueil
                  </Link>
                </li>
                <li className='header__navbar__list__element'>
                  <Link
                    onClick={handleClick}
                    className='header__navbar__list__element__link'
                    to='/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
                <li className='header__navbar__list__element'>
                  <Link
                    onClick={handleClick}
                    className='header__navbar__list__element__link'
                    to='/meals'
                  >
                    Mes repas
                  </Link>
                </li>
                <li className='header__navbar__list__element'>
                  <Link
                    onClick={handleClick}
                    className='header__navbar__list__element__link'
                    to='/planning'
                  >
                    Mon planning
                  </Link>
                </li>
                <li className='header__navbar__list__element'>
                  <Link
                    onClick={handleClick}
                    className='header__navbar__list__element__link'
                    to='/account'
                  >
                    Mon compte
                  </Link>
                </li>
                <li className='header__navbar__list__element'>
                  {isLogged ? (
                    <Link
                      onClick={handleLogOut}
                      className='header__navbar__list__element__link'
                      to='/home'
                    >
                      Déconnexion
                    </Link>
                  ) : (
                    <Link
                      onClick={handleClick}
                      className='header__navbar__list__element__link'
                      to='/login'
                    >
                      Connexion
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <nav className='header__navbar-desktop'>
          <ul className='header__navbar-desktop__list'>
            <li className='header__navbar-desktop__list__element'>
              <Link
                className='header__navbar-desktop__list__element__link'
                to='/home'
              >
                Accueil
              </Link>
            </li>
            <li className='header__navbar-desktop__list__element'>
              <Link
                className='header__navbar-desktop__list__element__link'
                to='/dashboard'
              >
                Dashboard
              </Link>
            </li>
            <li className='header__navbar-desktop__list__element'>
              <Link
                className='header__navbar-desktop__list__element__link'
                to='/meals'
              >
                Mes repas
              </Link>
            </li>
            <li className='header__navbar-desktop__list__element'>
              <Link
                className='header__navbar-desktop__list__element__link'
                to='/planning'
              >
                Mon planning
              </Link>
            </li>
            <li className='header__navbar-desktop__list__element'>
              Mon compte
            </li>
            <li className='header__navbar-desktop__list__element'>
              {isLogged ? (
                <Link
                  onClick={handleLogOut}
                  className='header__navbar__list__element__link'
                  to='/home'
                >
                  Déconnexion
                </Link>
              ) : (
                <Link
                  onClick={handleClick}
                  className='header__navbar__list__element__link'
                  to='/login'
                >
                  Connexion
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    isLogged: state.user.isLogged,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  logOut: () => {
    dispatch({
      type: 'LOG_OUT',
    });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
