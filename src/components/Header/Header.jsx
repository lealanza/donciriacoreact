import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import { Container } from '@chakra-ui/react'
import { Row } from 'reactstrap'
import logo from '../../LOGOS/logo.png'

const Header = () => {
  return (
    <header className="header">
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="navigation">
                        <ul className="menu">
                            <li className="nav__item">
                                <NavLink to='home'>Home</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to=''>Shop</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to=''>Cart</NavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </Row>
        </Container>
    </header>
  )
}

export default Header