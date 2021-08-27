import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import Btn from './Btn';

const FormContainer = styled.form`
    display: flex;
    flex-flow: column;
    padding: 5% 10%;
    margin: 3% 0;
    width: 100%;

    & input, textarea{
        margin-bottom: 5%;
        border: 1px solid ${colors.secondary};
    }

    & input[type="text"]{
        height: 30px;
    }

    & input[type="checkbox"]{
        margin: 0 5% 0 0 ;
    }

    &. checkbox_container{
        display: flex;
    }

    & .statement_container{
        margin-bottom: 5%;
    }

    & .statement, a{
        font-size: 0.75em;
        color: ${colors.primary};
    }

    @media screen and (min-width: 768px){
        width: 50%;
    }
`

const Form = (props) => {
    return (
        <FormContainer>
            <label htmlFor="name">Imię</label>
            <input type="text" name="name" />

            <label htmlFor="surrname">Naziwsko</label>
            <input type="text" name="surrname" />

            {props.email && <label htmlFor="email">Email</label>}
            {props.email && <input type="text" name="email" />}

            <label htmlFor="tel">Telefon</label>
            <input type="text" name="tel" />

            {props.description && <label htmlFor="desc">Treść</label>}
            {props.description && <textarea name="desc" id="desc" cols="30" rows="10"></textarea>}

            <div className="checkbox_container">
                <input type="checkbox" name="rodo" id="rodo"/>
                <label htmlFor="rodo">
                <a href="rodo">Akceptuę politykę prywatności</a></label>
            </div>

            <div className="checkbox_container statement_container">
                <input type="checkbox" name="statement" id="rodo"/>
                <label htmlFor="statement" className="statement">Działając w imieniu własnym, w związku z przekazywanymi danymi osobowymi Administratorowi danych  LM FLOW Sp. z o. o. z siedzibą w Goląszy Dolnej, Goląsza Dolna 44, gmina Psary, 42-504, zarejestrowanego w Sądzie Rejonowym Katowice-Wschód w Katowicach, Wydział VIII Gospodarczy Krajowego Rejestru Sądowego, pod nr KRS: 599464, posługującego się nr NIP: 625-245-63-17, niniejszym oświadczam, że zostałem pouczony przez Administratora danych, że obowiązek informacyjny przewidziany w art. 13 RODO został przez niego wypełniony w zakładce Polityka prywatności.</label>
            </div>
            {props.btn &&
                <Btn
                name="Wyślij"
                />
            }
        </FormContainer>
    );
}

export default Form;
