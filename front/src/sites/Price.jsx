import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const PriceContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    min-height: 70vh;

    & h1{
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }
`

const Price = () => {
    const [priceList, setPriceList] = useState("");

    const showPriceList = () => {
        axios.get('http://localhost:3001/show_price_list').then(response => {
            setPriceList(response.data[0].list);
        })
    }

    useEffect( () => {
        window.scrollTo(0, 0);
        showPriceList();
    },[]);

    return (
        <PriceContainer>
            <h1>Cennik</h1>
            {ReactHtmlParser(priceList)}
        </PriceContainer>
    );
}

export default Price;
