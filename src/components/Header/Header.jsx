import React, {useRef, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import { Container, Row } from 'reactstrap'
import logo from '../../LOGOS/logo.png'
import user from '../../LOGOS/user.png'
import { HiOutlineMenu } from 'react-icons/hi'
import { motion } from 'framer-motion'

const nav__links = [
    {
        path: 'home',
        display: 'Inico'
    }, {
        path: 'shop',
        display: 'Tienda'
    }, {
        path: 'cart',
        display: 'Carrito'
    },

]

const Header = () => {

   
    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }

        })
    }
    useEffect(()=>{
        stickyHeaderFunc()
        return ()=> window.removeEventListener('scroll', stickyHeaderFunc)
    })
    const menuToggle = ()=>{menuRef.current.classList.toggle('active__menu')}

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
                            <span className="fav__icon">
                                <i class="ri-heart-line"></i>
                                <span className="badge">1</span>
                            </span>
                            <span className="cart__icon">
                                <i class="ri-shopping-cart-line"></i>
                                <span className="badge">1</span>
                            </span>

                            <span>
                                <motion.img whileTap={{ scale: 1.3 }} src={user} alt="user" />
                            </span>
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