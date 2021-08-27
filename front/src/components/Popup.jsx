import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';

const Container = styled.div`
    width: 80%;
    height: 30%;
    position: fixed;
    top: 30%;
    left: 10%;
    background-color: ${colors.light};
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: ${colors.primary};
    font-weight: bold;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    animation-name: showPopUp;
    animation-duration: 1.5s;

    @keyframes showPopUp{
        0% {
            top: 150%;
        }
        70% {
            top: 25%;
        }
        100% {
            top: 30%;
        }
    }
`

const Popup = (props) => {
    return (
        <Container>
            <p>{props.name}</p>
        </Container>
    );
}

export default Popup;
