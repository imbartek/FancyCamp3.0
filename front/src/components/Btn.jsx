import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';

const BtnStyle = styled.button`
    height: 4.5rem;
    padding: 0 3rem;
    font-size: 1.25rem;
    background-color: ${colors.gold};
    color: ${colors.primary};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    outline: none;
    text-align: center;
`

const Btn = (props) => {
    return (
        <BtnStyle onClick={props.click} className={props.class}>
            {props.name}
        </BtnStyle>
    );
}

export default Btn;
