import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import { Container, Row } from 'reactstrap'
import logo from '../../LOGOS/logo.png'
import user from '../../LOGOS/user.png'
import { HiOutlineMenu } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { FaHeart, FaOpencart } from 'react-icons/fa'

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    }, {
        path: 'shop',
        display: 'Shop'
    }, {
        path: 'cart',
        display: 'Cart'
    },

]

const Header = () => {
    return (
        <header className="header">
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <Link className="logo" to="/home">
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className="navigation">
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
                                <FaHeart className="fav__icon"/>
                                <span className="badge">1</span>
                            </span>
                            <span className="cart__icon">
                                <FaOpencart className="cart__icon"/>
                                <span className="badge">1</span>
                            </span>

                            <span>
                                <motion.img whileTap={{ scale: 1.3 }} src={user} alt="user" />
                            </span>
                        </div>
                        <div className="mobile__menu">
                            <HiOutlineMenu />
                        </div>

                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header