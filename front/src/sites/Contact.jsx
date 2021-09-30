import React, {useEffect} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import Form from '../components/Form';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 5% 0;
    flex-wrap: wrap;

    & h1{
        color: ${colors.gold};
        font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }

    & p{
        margin: 6% 0;
    }
    & .map{
        height: 50vh;
        width: 80%;
        margin: 5% 0;
    }
`

const Contact = () => {

    useEffect( () => {
        window.scrollTo(0, 0);
    })

    return (
        <Container>
            <h1>Kontakt</h1>
            <iframe title="mymap" src="https://www.google.com/maps/d/u/0/embed?mid=12GXbW5YifimeWgAbrYGEei-eQL22Yr2K&z=10" className="map"></iframe>
            <Form
                email={true}
                description={true}
                btn={true}
            />
        </Container>
    );
}

export default Contact;
