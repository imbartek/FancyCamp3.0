import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import Btn from '../components/Btn';
import Popup from '../components/Popup';
import axios from 'axios';

const Container = styled.div`
    & .contact_container{
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 100vw;
    }

    & h1{
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }

    & .calendar{
        width: 80%;
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-bottom: 5%;

        .week{
            display: flex;
            justify-content: space-between;
        }

        select{
            border-radius: 5px;
            border: none;
            padding: 10px;
            background-color: ${colors.primary};
            color: ${colors.light};
            font-size: 1.25em;
        }

        table{
            width: 100%;
            height: 60vh;
            text-align: center;
            border-collapse: collapse;
            color: ${colors.light};

            & .day{
                width: 14%;
                cursor: pointer;
            }
            & .active{
                background-color: ${colors.gold} !important;
            }
            tr:nth-child(even){
                background-color: ${colors.primary};
                td:nth-child(odd){
                    background-color: ${colors.secondary};
                }
            }
            tr:nth-child(odd){
                background-color: ${colors.secondary};
                td:nth-child(odd){
                    background-color: ${colors.primary};
                }
            }
            & .day_name{
                background-color: ${colors.light};
                color: ${colors.primary}
            }
        }
    }

    & .form_container{
        display: flex;
        flex-flow: column;
        padding: 5% 10%;
        margin: 3% 0;
        width: 80%;

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
    }

    & .date{
        display: none;
    }
    & .resetBtn, .date{
        margin-bottom: 5%;
    }
    @media screen and (max-width: 768px){
        & .calendar table{
            width: 100%;
            height: 50vh;
        }
    }
`

const Calendar = () => {
    const [isCalendarLoad, setCalendarLoad] = useState(false)
    let [firstIndex, setFirstIndex] = useState(0);
    let [secondIndex, setSecondIndex] = useState(0);
    let [mounth, setMounth] = useState(0);
    let [year, setYear] = useState(0);
    let [count, setCount] = useState(0);
    let [name, setName] = useState("");
    let [surname, setSurname] = useState("");
    let [phone, setPhone] = useState(0);
    const [firstCheckBox, setFirstCheckBox] = useState(false);
    const [secondCheckBox, setSecondCheckBox] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);

    const checkDate = () => {
        const data = new Date();
        const month_index = data.getMonth();
        setMounth(mounth += month_index + 1);
        setYear(year += data.getFullYear())

        const list = document.getElementsByTagName('select');
        const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

        for (const month of months) {
            let newOption = document.createElement('option');
            newOption.text = month;
            if (months.indexOf(month) === month_index) {
                newOption.selected = 'selected';
            }
            list[0].appendChild(newOption);
        }
    }

    const changeMounth = (e) => {
        const oldCalendar = document.querySelectorAll('tr');
        oldCalendar.forEach(elem => {
            elem.parentNode.removeChild(elem);
        })
        createCalendar(e.target.selectedIndex);
    }


    const dt = new Date();
    const month = dt.getMonth();

    const createCalendar = (event = month) => {
        const calendar = document.querySelector('.calendar_table');


        let tr = document.createElement("tr");
        const days = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];
        days.forEach(day => {
            const th = document.createElement("th");
            th.classList.add('day_name')
            th.innerHTML = day;
            tr.appendChild(th);
        });
        calendar.appendChild(tr);

        //tutaj bedzie zmiana miesiaca z selecta
        let daysInMonth = new Date(year, event + 1, 0).getDate();

        const tempDate = new Date(year, event, 1);
        let firstMonthDay = tempDate.getDay();

        if (firstMonthDay === 0) {
            firstMonthDay = 7;
        }

        const j = daysInMonth + firstMonthDay - 1;

        if (firstMonthDay - 1 !== 0) {
            tr = document.createElement("tr");
            calendar.appendChild(tr).classList.add('row');
        }

        for (let i = 0; i < firstMonthDay - 1; i++) {
            const td = document.createElement("td");
            td.innerHTML = "";
            tr.appendChild(td);
        }

        for (let i = firstMonthDay - 1; i < j; i++) {
            if (i % 7 === 0) {
                tr = document.createElement("tr");
                calendar.appendChild(tr);
            }

            const td = document.createElement("td");
            td.innerText = i - firstMonthDay + 2;
            td.dayNr = i - firstMonthDay + 2;
            td.classList.add("day");

            tr.appendChild(td);
        }

    }

    const handleClick = (e) => {
        const days = document.querySelectorAll('.day');
        const date = document.querySelector('.date');
        setCount(count + 1);

        if (count === 0 && e.target.innerHTML !== '') {
            setFirstIndex(firstIndex += e.target.dayNr - 1);
        }
        if (count === 1) {
            setSecondIndex(secondIndex += e.target.dayNr - 1);
        }
        if (firstIndex < secondIndex) {
            if (secondIndex > 0) {
                for (let i = firstIndex; i <= secondIndex; i++) {
                    days[i].classList.add('active');
                }
                date.style.display = 'block';
                date.innerHTML = `Wybrano termin: ${firstIndex + 1}.0${mounth}.${year} - ${secondIndex + 1}.0${mounth}.${year}`
            }
        }

        if (secondIndex > 0 && secondIndex < firstIndex) {
            date.innerHTML = `Najpierw zaznacz pierwszy dzień najmu.`;
        }
    }


    const bookIt = (e) => {
        let convertedMounth = "";
        let convertedFirstDay = "";
        let convertedSecondDay = "";
        if (mounth > 10) {
            convertedMounth += mounth
        }
        else {
            convertedMounth += `0${mounth}`
        }

        if (firstIndex > 10) {
            convertedFirstDay += firstIndex;
        }
        else {
            convertedFirstDay += `0${firstIndex + 1}`;
        }

        if (secondIndex > 10) {
            convertedSecondDay += secondIndex + 1;
        }
        else {
            convertedSecondDay += `0${secondIndex + 1}`
        }
        if (firstCheckBox && secondCheckBox) {
            axios.post('http://localhost:3001/add_date',
                {
                    name: name,
                    surname: surname,
                    phone: phone,
                    fromDate: `${year}-${convertedMounth}-${convertedFirstDay}`,
                    toDate: `${year}-${convertedMounth}-${convertedSecondDay}`
                }).then((response) => {
                    console.log(response);
                    console.log(surname);
                });
            const container = document.querySelector('.contact_container');
            container.style.filter = "blur(4px)";
            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
                window.scrollTo(0, 0);
            }, 3000);
        }
        else {
            alert("Proszę uzupełnić wszystkie pola.")
        }
        e.preventDefault();
    }

    const resetDate = () => {
        setFirstIndex(firstIndex -= firstIndex);
        setSecondIndex(secondIndex -= secondIndex);
        setCount(count -= count)
        const date = document.querySelector('.date');
        date.innerHTML = '';
        const days = document.querySelectorAll('.day');

        days.forEach(day => {
            day.classList.remove('active');
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isCalendarLoad === false) {
            checkDate();
            createCalendar();
            setCalendarLoad(isCalendarLoad === true);
        }
        //eslint-disable-next-line
    }, [isCalendarLoad])

    return (
        <Container>
            <div className="contact_container">
                <h1>Rezerwacje</h1>
                <div className="calendar">
                    <select name="mounths" id="mounths" onChange={changeMounth}>

                    </select>
                    <table className="calendar_table" onClick={handleClick}>
                    </table>
                </div>
                <div className="date"></div>
                <Btn
                    name="Resetuj"
                    click={resetDate}
                    class="resetBtn"
                />
                <form className="form_container">
                    <label htmlFor="name">Imię</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} required />

                    <label htmlFor="surname">Nazwisko</label>
                    <input type="text" name="surname" onChange={(e) => setSurname(e.target.value)} required />

                    <label htmlFor="tel">Telefon</label>
                    <input type="text" name="tel" onChange={(e) => setPhone(e.target.value)} required />

                    <div className="checkbox_container">
                        <input type="checkbox" name="rodo" id="rodo" required onChange={() => setFirstCheckBox(true)} />
                        <label htmlFor="rodo">
                            <a href="rodo">Akceptuę politykę prywatności</a></label>
                    </div>

                    <div className="checkbox_container statement_container">
                        <input type="checkbox" name="statement" id="statement" required onChange={() => setSecondCheckBox(true)} />
                        <label htmlFor="statement" className="statement">Działając w imieniu własnym, w związku z przekazywanymi danymi osobowymi Administratorowi danych  LM FLOW Sp. z o. o. z siedzibą w Goląszy Dolnej, Goląsza Dolna 44, gmina Psary, 42-504, zarejestrowanego w Sądzie Rejonowym Katowice-Wschód w Katowicach, Wydział VIII Gospodarczy Krajowego Rejestru Sądowego, pod nr KRS: 599464, posługującego się nr NIP: 625-245-63-17, niniejszym oświadczam, że zostałem pouczony przez Administratora danych, że obowiązek informacyjny przewidziany w art. 13 RODO został przez niego wypełniony w zakładce Polityka prywatności.</label>
                    </div>
                    <Btn
                        name="Zarezerwuj"
                        click={bookIt}
                        class="resetBtn"
                    />
                </form>
            </div>
            {
                showPopUp && <Popup name="Zarezerwowano" />
            }
        </Container >
    );
}

export default Calendar;
