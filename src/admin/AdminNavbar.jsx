import { TextField } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import logo from '../LOGOS/ciriacioicon.png';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyle = styled.header`
    width: 100%;
    padding: 5px 0px;
    background: var(--color-second);
`
export const DivNavBarTop = styled.div`
    width: 100%;
    height: 80px;
    `
export const DivNavWrapperTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap:3rem`
export const Name = styled.h4`
    text:center;
    color:var(--color-primary);
    font-weight:600;`
export const DivNavBarTopRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:20px`
export const Span = styled.span`
    font-size: 20px;
    color: var(--color-primary);
    cursor: pointer;`
export const DivSearch = styled.div`
    display:flex;
    top:20px;
    width:800px;
    margin:15px;
`
export const DivNavigation = styled.div`
text-align:center;
`

export const MenuList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap:2rem;
`


const admin_nav = [
    {
        display: 'Ordenes',
        path: '/dashboard/orders',
    }, {
        display: 'Usuarios',
        path: '/dashboard/users',
    },

]
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    background-color: white;
    padding: 8px 15px;
    border-radius: 15px;
    color: var(--color-primary);
    text-decoration-color: var(--color-primary);
  }
`;
const AdminNavbar = () => {

    const { currentUser } = useSelector(state => state.user)
    return (
        <>
            <HeaderStyle>
                <DivNavBarTop>
                    <Container>
                        <DivNavWrapperTop>
                            <Link className="logo" to="/home">
                                <img src={logo} alt="logo" />
                            </Link>
                            <DivSearch>
                                <TextField id="outlined-basic" size="small" fullWidth label="Search" variant="outlined" style={{ textDecorationColor: 'white' }} />
                            </DivSearch>
                            <DivNavBarTopRight>
                                <Span>
                                    <i class="ri-notification-2-line"></i>
                                </Span>
                                <Span>
                                    <i class="ri-settings-2-line"></i>
                                </Span>
                                <Name>{currentUser.name}</Name>
                            </DivNavBarTopRight>

                        </DivNavWrapperTop>
                    </Container>
                </DivNavBarTop>
            </HeaderStyle>
            <section style={{ width: '100%', height: '70px', backgroundColor: 'var(--color-primary)', color: 'white', lineHeight: '70px', padding: 0 }}>
                <Container>
                    <Row>
                        <DivNavigation>
                            <MenuList>
                                {
                                    admin_nav.map((item, index) => (
                                        <li key={index}>
                                            <StyledNavLink to={item.path}>{item.display}</StyledNavLink>
                                        </li>
                                    ))
                                }
                            </MenuList>
                        </DivNavigation>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AdminNavbar