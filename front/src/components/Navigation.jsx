import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/login';
import { deleteName } from '../actions/userName';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import { FiPower } from 'react-icons/fi';

const Nav = styled.div`
    width: 100%;
    height: 10vh;
    position: sticky;
    top: 0;
    padding: 0 5%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid ${colors.primary};
    color: ${colors.primary};
    background-color: ${colors.light};
    z-index: 1;

    & .desktop_nav{
        display: flex;
        justify-content: space-between;
        list-style: none;
        width: 60%;
    }

    & .hamburger_menu{
        display: none
    }

    & .mobile_nav{
            width: 100vw;
            position: absolute;
            top: -120vh;
            left: 0;
            display: none;
            flex-flow: column;
            align-items: center;
            background-color: ${colors.light};
            transition: 1s ease-in-out;

            > li {
                list-style: none;
                width: 100%;
                text-align: center;
                border-bottom: 1px solid ${colors.primary};
            }
            & a{
                display: inline-block;
                width: 100%;
                padding: 6% 0;
            }
        }
    & .active{
        top: 10vh;
    }

    @media screen and (max-width: 768px){
        top: 0;

        & .desktop_nav{
            display: none;
        }
        & .mobile_nav{
            display: flex;
        }

        & .hamburger_menu{
            width: 50px;
            height: 50px;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            padding: 10px;

            .line{
            height: 10%;
            background-color: ${colors.primary};
            border-radius: 5px;
        }
        }
    }
`

const Navigation = () => {

    const isLogged = useSelector((state) => state.login);
    const userName = useSelector((state) => state.username)
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(login());
        dispatch(deleteName());
    }

    const handleClick = () => {
        const menu = document.querySelector('.mobile_nav');
        menu.classList.toggle('active');
    }

    return (
        <Nav>
            <Link to="/"><img src="" alt="FancyCamp" /></Link>
            <ul className="desktop_nav">
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/about">Specyfikacja</Link></li>
                <li><Link to="gallery">Galeria</Link></li>
                <li><Link to="calendar">Rezerwacje</Link></li>
                <li><Link to="price">Cennik</Link></li>
                <li><Link to="travels">Podróże</Link></li>
                <li><Link to="contact">Kontakt</Link></li>
                <li>{!isLogged ? <Link to="/login"><FiPower/></Link> : <Link to="/admin">{userName}</Link>}</li>
                {isLogged && <li><Link to="/" onClick={logOut}>Wyloguj się</Link></li>}
            </ul>
            <div className="mobile_nav" onClick={handleClick}>
                <li>{!isLogged ? <Link to="/login"><FiPower/></Link> : <Link to="/admin">{userName}</Link>}</li>
                {isLogged && <li><Link to="/" onClick={logOut}>Wyloguj się</Link></li>}
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/about">Specyfikacja</Link></li>
                <li><Link to="gallery">Galeria</Link></li>
                <li><Link to="calendar">Rezerwacje</Link></li>
                <li><Link to="price">Cennik</Link></li>
                <li><Link to="travels">Podróże</Link></li>
                <li><Link to="contact">Kontakt</Link></li>
            </div>
            <div className="hamburger_menu" onClick={handleClick}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </Nav>
    );
}

export default Navigation;
