import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { images, colors } from '../utils/utils';
import styled from 'styled-components';
import Btn from '../components/Btn';

const Main = styled.div`
    & h1{
            color: ${colors.gold};
            font-size: ${20 * 2.6 + "px"};
        }

    & h2{
        margin-bottom: 5%;
        color: ${colors.primary};
    }

    &   p{
            color: ${colors.secondary};
            font-size: 20px;
        }

    @media screen and (max-width: 768px){
        & h1{
            font-size: ${16 * 2.6 + "px"};
        }
    &   p{
            font-size: 16px;
        }
    }
`

const Top = styled.div`
    height: 90vh;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 3%;

    & img, div{
        width: 48%;
    }

    @media screen and (max-width: 768px){
        flex-flow: column;
        height: 100%;
        margin-bottom: 10%;

        & img, div{
        width: 90%;
    }
    }
`
const Mid = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 5% 3%;
    background-color: ${colors.primary};

    & div{
        width: 48%;
    }

    & h1{
        margin-bottom: 5%;
    }

    @media screen and (max-width: 768px){
        flex-flow: column;

        & div{
        width: 90%;
        margin-bottom: 5%;
    }
    }
`
const Bottom = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 5% 0;
    text-align: center;

    & div{
        display: flex;
        justify-content: space-between;
        margin: 15% 0;
        width: 100%;
        padding: 0 15%;
    }

    & h1{
        margin-bottom: 5%;
    }

    @media screen and (max-width: 768px){

       & div{
        height: 30vh;
        flex-flow: column;
        padding: 0;
    }
    }
`

const MainSite = () => {

    useEffect( () => {
        window.scrollTo(0, 0);
    })
    return (
        <Main>
            <Top>
                <img src={images.camper} alt="camper"/>
                <div>
                    <h1>FancyCamp</h1>
                    <h2>Całoroczny Camper</h2>
                    <p>Zapraszamy Was do wspólnej podróży naszym FancyCampem, chcemy dzielić się nim, z wszystkimi tymi, którzy jak my chcą rozpocząć przygodę camperową.
                    </p>
                </div>
            </Top>
            <Mid>
                <div>
                    <h1>Rodzina i przyjaciele</h1>
                    <p>Stawiamy za to na rodzinę i przyjaciół, na wolność, swobodę i nieograniczone możliwości w podróżowaniu. Kiedy nie będziemy podróżować z naszą rodziną lub przyjaciółmi, to chcemy abyście to Wy korzystali z naszego FancyCampa.</p>
                </div>
                <img src={images.family} alt="family" />
            </Mid>
            <Bottom>
                <h1>Doświadczenie</h1>
                <p>Nie jesteśmy profesjonalna wypożyczalnią, nie posiadamy bogatego zaplecza ani doświadczenia, tego ostatniego chcemy się uczyć razem z Wami.
                </p>
                <p>Razem będziemy tworzyć historię FancyCampa, dzielić się doświadczeniem i wrażeniami.
                </p>
                <p>Podróżuj z nami. Serdecznie zapraszamy.</p>
                <div>
                    <Link to="/price">
                    <Btn
                        name = "Sprawdź cennik"
                        />
                    </Link>
                    <Link to="/calendar">
                    <Btn
                        name = "Zarezerwuj termin"
                        />
                    </Link>
                </div>
            </Bottom>
        </Main>
    );
}

export default MainSite;
