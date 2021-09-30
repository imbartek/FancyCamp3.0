import React from 'react';
import styled from 'styled-components';
import { colors, images } from '../utils/utils';

const Container = styled.footer`
    width: 100%;
    background-color: ${colors.primary};
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 3% 5%;
    color: ${colors.light};

    & img{
        width: 40px;
    }

    & div:nth-child(2){
        width: 35%;
        display: flex;
        justify-content: space-between;
    }

    & ul{
        list-style: none;
    }

    & .footer{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    @media screen and (max-width: 768px){
        flex-flow: column;

        & > div{
            margin: 5% 0;
        }

        & div:nth-child(2){
            width: 60%;
        }
    }
`

const Footer = () => {
    return (
        <Container>
            <div className="footer">
                <img src={images.location} alt="location_icon" />
                <img src={images.instagram} alt="instagram_icon" />
            </div>
            <div>
                <p>Designed by im.bartek@o2.pl</p>
            </div>
        </Container>
    );
}

export default Footer;
