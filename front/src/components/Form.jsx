import React, {useState} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import Btn from './Btn';
import axios from 'axios';

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
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [details, setDetails] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail();
    }

    const sendEmail = () => {
        axios.post("http://localhost:3001/send_mail",{
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            details: details
        }).then(response => {
            console.log("wyslano email");
        })
    };


    return (
        <FormContainer onSubmit={handleSubmit}>
            <label htmlFor="name">Imię</label>
            <input type="text" name="name" onChange={e => setName(e.target.value)}/>

            <label htmlFor="surrname">Naziwsko</label>
            <input type="text" name="surrname" onChange={e => setSurname(e.target.value)}/>

            {props.email && <label htmlFor="email">Email</label>}
            {props.email && <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>}

            <label htmlFor="tel">Telefon</label>
            <input type="text" name="tel" onChange={e => setPhone(e.target.value)}/>

            {props.description && <label htmlFor="desc">Treść</label>}
            {props.description && <textarea name="desc" id="desc" cols="30" rows="10" onChange={e => setDetails(e.target.value)}></textarea>}

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
