import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from '../actions/login';
import { userName } from '../actions/userName';
import styled from 'styled-components';
import axios from 'axios';
import Btn from '../components/Btn';
import { colors } from '../utils/utils';
import Admin from '../sites/Admin/Admin';

const LoginContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    min-height: 50vh;

    & .form{
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 50%;
    }

    & input {
        width: 60%;
        margin: 0 0 5% 0;
        padding: 2.5%;
        border-radius: 0.5rem;
        border: 0.5px solid ${colors.primary};
        color: ${colors.primary};
        outline: none;
    }

    & label{
        margin: 5% 0 3% 0;
        color: ${colors.primary};
    }

    @media screen and (min-width: 768px){
        & .form{
            width: 50%;
        }
    }
`

const Login = () => {

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassowrd] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [isLogged, setIsLogged] = useState(false);
    const isLogged = useSelector((state) => state.login);
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;

    const register = () => {
        console.log(userLogin, userPassword);
        axios.post("http://localhost:3001/register",
            {
                username: userLogin,
                password: userPassword
            }).then((response) => {
            console.log(response);
        })
    }

    const history = useHistory();
    const loginConnect = () => {
        axios.post("http://localhost:3001/login", {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data);
            }
            else {
                console.log(response.data[0].username);
                dispatch(login());
                dispatch(userName(username));
                history.push("/admin");
            }
        })
    }

    return (
        <LoginContainer>
            {!isLogged &&
                <div className="form">
                    <label htmlFor="name">Nazwa użytkownika</label>
                    <input type="text" onChange={ e => setUserLogin(e.target.value) }/>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" onChange={ e => setUserPassowrd(e.target.value) } />
                    <Btn
                        click={register}
                        name="Rejestracja"
                    />

                    <label htmlFor="name">Nazwa użytkownika</label>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="password">Hasło</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <Btn
                        click={loginConnect}
                        name="Zaloguj się"
                    />
                </div>
            }
            {isLogged &&
                <Admin/>
            }
        </LoginContainer>
    );
}

export default Login;
