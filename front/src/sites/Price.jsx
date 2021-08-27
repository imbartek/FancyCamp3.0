import React, {useEffect} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';

const PriceContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;

    & h1{
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }
`

const Price = () => {

    useEffect( () => {
        window.scrollTo(0, 0);
    });

    return (
        <PriceContainer>
            <h1>Cennik</h1>
        </PriceContainer>
    );
}

export default Price;
