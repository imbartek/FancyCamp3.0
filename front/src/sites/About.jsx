import React, {useEffect} from 'react'
import styled from 'styled-components';
import {colors} from '../utils/utils';

const AboutContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;

    & h1{
        margin 2% 0;
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
    }

    & h3{
        color: ${colors.primary};
        margin-bottom: 2%;
    }

    & p{
        color: ${colors.fourth};
    }

    & > div{
        width: 60%;
        margin-bottom: 5%;

        & li{
            list-style-type: circle;
            color: #74747c;
        }
    }

    @media screen and (max-width: 768px){
        & h1{
            margin 2% 0 5% 0;
        }
    }
`

export default function About() {

    useEffect( () => {
        window.scrollTo(0, 0);
    });

    return (
        <AboutContainer>
            <h1>Specyfikacja</h1>
            <div>
                <h3>DANE SAMOCHODU</h3>
                <li>Auto Roller 284M Alkoven</li>
                <li>Transit 2.0 TDCi 130KM</li>
                <li>Rok produkcji: 2021</li>
                <li>Ilość osób do jazdy: 5</li>
                <li>Ilość miejsc do spania: 4/5</li>
                <li>Automat</li>
                <li>Klimatyzacja</li>
                <li>ESP</li>
                <li>Lusterka elektryczne poduszka powietrzna kierowcy i pasażera</li>
                <li>Tempomat</li>
                <li>Obrotowe siedzenia w kabinie kierowcy z regulacją wysokości i nachylenia</li>
                <li>Kamera cofania</li>
                <li>Nawigacja z ekranem</li>
                <li>Poszerzona oś</li>
            </div>
            <div>
                <h3>WYPOSAŻENIE</h3>
                <li>Klimatyzacja silnikowa i webasto</li>
                <li>Ogrzewanie gazowe 4000W</li>
                <li>Zbiornik na czystą wodę 100L</li>
                <li>Zbiornik na szarą wodę 120L</li>
                <li>2 butle gazowe</li>
                <li>Gazbank z zestawem adapterów na Europę</li>
                <li>System duo-control</li>
                <li>Tri gaz</li>
                <li>Solar 130W</li>
            </div>
            <div>
                <li>Drzwi wejściowe z oknem</li>
                <li>Moskitiera w drzwiach wejściowych</li>
                <li>Kuchenka 3 palnikowa</li>
                <li>Zlewozmywak</li>
                <li>Lodówka automatyczna z zamrażarką 140L</li>
                <li>Markiza Thule</li>
                <li>Namiot Safari Residence</li>
                <li>Podłoga</li>
                <li>Stół i 4 krzesła</li>
                <li>Tv 22” 12V Smart</li>
                <li>Antena satelitarna automatyczna</li>
                <li>Dekoder + karta</li>
                <li>Bagażnik na 4 rowery + pokrowiec</li>
            </div>
            <div>
                <li>Sypialnia 1- dwa łóżka pojedyncze, możliwość połączenia.</li>
                <li>Dwie poduszki + dwie kołdry, dwie narzuty dodatkowe poduszki dekoracyjne.</li>
                <li>Sypialnia 2 – jedno duże łóżko małżeńskie (alkowa).</li>
                <li>Dwie poduszki + dwie kołdry, narzuta dodatkowe poduszki dekoracyjne.</li>
                <li>Ubikacja z umywalką.</li>
                <li>Papier do toalet chemicznych, płyny chemiczne, mydło w płynie, płyn do dezynfekcji.</li>
                <li>Łazienka z prysznicem.</li>
            </div>
            <div>
                <h3>Pełne wyposażenie kuchni:</h3>
                <li>Garnki + patelnia</li>
                <li>Zastawa stołowa</li>
                <li>Sztućce</li>
                <li>Akcesoria kuchenne</li>
                <li>Akcesoria do sprzątania</li>
                <li>Suszarka na pranie</li>
            </div>
            <div>
                <h3>We własnym zakresie ze względów sanitarnych:</h3>
                <li>Pościel o wymiarach: 150x200 cm; 50x60 cm</li>
                <li>Ręczniki</li>
                <li>Ściereczki</li>
            </div>
        </AboutContainer>
    )
}
