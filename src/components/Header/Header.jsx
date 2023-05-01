import React, {useRef, useEffect} from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import './header.css'
import { Container, Row } from 'reactstrap'
import logo from '../../LOGOS/logo.png'
import user from '../../LOGOS/user.png'
import { HiOutlineMenu } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firabase.config'
import { toast } from 'react-toastify'

const nav__links = [
    {
        path: 'home',
        display: 'Inicio'
    }, {
        path: 'shop',
        display: 'Tienda'
    }, {
        path: 'cart',
        display: 'Carrito'
    },

]

const Header = () => {

    const navigate = useNavigate()
    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const totalQuantity = useSelector(state=>state.cart.totalQuantity)
    const profileActionsRef = useRef(null)

    const {currentUser} = useAuth()
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }

        })
    }
    const logout = () =>{

        signOut(auth).then(()=>{
            toast.success('Cerro sesion')
            navigate("/home")
        }).catch(err=>{
            toast.err(err.message)
        })
    }
    useEffect(()=>{
        stickyHeaderFunc()
        return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
    })
    const menuToggle = ()=>{menuRef.current.classList.toggle('active__menu')};

    const navigateToCart= ()=>{
        navigate('/cart')
    }

    const toglleProfileActions = ()=>{profileActionsRef.current.classList.toggle('show__profile-actions')}
    const navigateToProfile = () => {navigate( '/profile')}

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <Link className="logo" to="/home">
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu">
                                {
                                    nav__links.map((item, index) =>
                                        <li className="nav__item" key={index}>
                                            <NavLink to={item.path}
                                                className={(navClass) =>
                                                    navClass.isActive ? "nav__active" : ""}
                                            >
                                                {item.display}</NavLink>
                                        </li>)
                                }
                            </ul>
                        </div>

                        <div className="nav__icons">
                            
                            <span className="cart__icon" onClick={navigateToCart}>
                                <i class="ri-shopping-cart-line"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <div className='profile'>
                                <motion.img
                                 whileTap={{ scale: 1.2 }} 
                                 src={currentUser ? currentUser.photoURL: user} 
                                 alt="" 
                                 onClick={toglleProfileActions} 
                                 />
                                <div 
                                className="profile__actions" 
                                ref={profileActionsRef} 
                                onClick={toglleProfileActions}>
                                    
                                    {currentUser ?( 
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                        <span onClick={navigateToProfile}>Perfil</span>
                                        <span onClick={logout}>Logout</span> 
                                        </div>               
                                    ):(
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                            <Link to='/singup' >Singup</Link>
                                            <Link to='/login' >Login</Link>
                                        </div>
                                        )}
                                </div>
                            </div>
                            <div className="mobile__menu">
                                <span onClick={menuToggle}>
                                    <HiOutlineMenu />
                                </span>
                            
                            </div>
                        </div>
                        

                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header