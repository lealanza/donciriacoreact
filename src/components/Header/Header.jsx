import React, {useCallback, useEffect, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { Container, Row } from 'reactstrap';
import logo from '../../LOGOS/logo.png';
import { HiOutlineMenu } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { ADMIN } from '../../data/utlis';

const navLinks = [
  {
    path: 'home',
    display: 'Inicio',
  },
  {
    path: 'shop',
    display: 'Tienda',
  }
];

const Header = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileActionsOpen, setIsProfileActionsOpen] = React.useState(false);
  const [isStickyHeader, setIsStickyHeader] = React.useState(false);
  const totalQuantity = useSelector(({cart}) => cart.totalQuantity);
  const { currentUser } = useSelector(({user}) => user);

  const stickyHeaderFunc = useCallback(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 80) {
        setIsStickyHeader(true);
      } else {
        setIsStickyHeader(false);
      }
    });
  }, []);

  useEffect(() => {
    stickyHeaderFunc();
    
    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, [stickyHeaderFunc]);

  const logout = useCallback(() => {
    dispatch(setCurrentUser(null));
    toast.success('Hasta pronto!!!');
    navigate('/');
  }, [dispatch, navigate]);

  const navigateToCart = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const navigateToProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);
  
  const handleProfileActionsToggle = useCallback(() => {
    setIsProfileActionsOpen(!isProfileActionsOpen);
  }, [isProfileActionsOpen]);

  const renderNavLinks = useMemo(() => {
    return navLinks.map((item, index) => (
      <li className="nav__item fs-6" key={index}>
        <NavLink
          to={item.path}
          isActive={(match, location) => {
            if (!match) {
              return false;
            }
            const { pathname } = location;
            return pathname === item.path;
          }}
          activeClassName="nav__active"
        >
          {item.display}
        </NavLink>
      </li>
    ));
  }, []);

  const renderProfileActions = useMemo(() => {
    if (!currentUser) {
      return (
        <div className="d-flex align-items-center justify-content-center flex-column">
          <Link to="/singup">Singup</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }

    const actions = [
      { title: 'Perfil', onClick: navigateToProfile },
      { title: 'Logout', onClick: logout }
    ];

    if (currentUser.role === ADMIN) {
      actions.unshift({ title: 'Dashboard', onClick: () => navigate('/dashboard') });
    }

    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        {actions.map((item, index) => (
          <span key={index} onClick={item.onClick}>
            {item.title}
          </span>
        ))}
      </div>
    );
  }, [currentUser, logout, navigate, navigateToProfile]);

  return (
    <header className={`header ${isStickyHeader ? 'sticky__header' : ''}`}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link className="logo" to="/home">
              <img src={logo} alt="logo" />
            </Link>

            <div className="nav__icons">
              <div className={`navigation ${isMenuOpen ? 'active__menu' : ''}`} onClick={handleMenuToggle}>
                <ul className="menu">{renderNavLinks}</ul>
              </div>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <span onClick={handleProfileActionsToggle}>
                  {currentUser ? currentUser.userName : 'Usuario'}
                </span>
                <div
                  className={`profile__actions ${isProfileActionsOpen ? 'show__profile-actions' : ''}`}
                >
                  {renderProfileActions}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={handleMenuToggle}>
                  <HiOutlineMenu />
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
});

export default Header;
