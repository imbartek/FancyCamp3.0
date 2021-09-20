import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/utils';
import AdminBlog from './AdminBlog';
import AdminGallery from './AdminGallery';
import AdminPriceList from './AdminPriceList';
import NavAdmin from './NavAdmin';
import Reservation from './Reservation';

const Container = styled.div`
    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-flow: column;
    align-items: center;

    & nav{
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

        & ul{
            display: flex;
            justify-content: space-between;
            list-style: none;
            width: 80%;
            margin: auto;
        }
    }

    & .panel{
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100%;
        min-height: 60vh;

        & h1{
            color: ${colors.gold};
            margin: 5% 0;
            font-size: 1.5rem;
        }

        & table{
            width: 80vw;
            text-align: center;
            border-collapse: collapse;

            & td{
                border: 1px solid black;
                padding: 2px;
            }
            & .btn{
                cursor: pointer;
            }
        }
    }

    & .welcome{
        font-size: 3rem;
        color: ${colors.primary};
        animation: showUp 3s linear;
        position: absolute;
        top: 40vh;
        opacity: 0;
    }

    @keyframes showUp{
        0%{
            opacity: 0;
            top: 20vh;
        }
        25%{
            opacity: 0.25;
            top: 25vh;
        }
        50%{
            opacity: 0.5;
            top: 30vh;
        }
        75%{
            opacity: 1;
            top: 35vh;
        }
        100%{
            opacity: 0;
            display: none;
        }
    }

    @media only screen and (max-width: 768px){
        & table{
            font-size: 12px;
        }
    }
`

const Admin = () => {

    const userName = useSelector((state) => state.username);

    const welcome = () => {
        const container = document.querySelector('.welcome');
        console.log(container);
        console.log(userName);
    };

    useEffect(() => {
        welcome();
    })

    return (
        <Container>
            <Router>
                <NavAdmin />
                {/*<div className="welcome">
                    <h3>Witaj {userName}</h3>
                    <p>Co dziś robimy?</p>
    </div>*/}
                <Switch>
                    <Route exact path="/reservation" component={Reservation} />
                    <Route exact path="/posts" component={AdminBlog}/>
                    <Route exact path="/gallery" component={AdminGallery} />
                    <Route exact path="/price_list" component={AdminPriceList} />
                </Switch>
            </Router>
        </Container>
    );
}

export default Admin;
