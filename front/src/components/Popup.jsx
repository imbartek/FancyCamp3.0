import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';

const Container = styled.div`
    width: 80%;
    height: 30%;
    position: fixed;
    bottom: -50%;
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
    opacity: 0;
`

const Popup = (props) => {
    return (
        <Container className="popup">
            <p>{props.name}</p>
        </Container>
    );
}

export default Popup;
