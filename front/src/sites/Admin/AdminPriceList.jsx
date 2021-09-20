import React, { useState, useEffect} from 'react';
import CKEditor from 'ckeditor4-react';
import ReactHtmlParser from 'react-html-parser';
import Btn from '../../components/Btn';
import axios from 'axios';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const Container = styled.div`
    width: 60vw;
    margin: 2em 0;

    & .main button{
        height: 2em;
        margin: 1em 0;
    }
    & .title_container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & input{
        height: 30px;
        margin: 5% 0;
    }
    & td{
        padding: 0.5em;

        & button {
            margin 0 0.5em;
        }
    }
    & .buttons_container{
        display: flex;
        justify-content: space-between;
    }
`

export default function AdminPriceList() {
    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);


    const handleChange = (e) => {
        const data = e.editor.getData();
        setVal(data);
        console.log(data);
    }

    const addPriceList = () => {
        axios.post('http://localhost:3001/add_price_list',
            {
                list: addData
            }).then((response) => {
            });
    }

    const showPriceList = () => {
        axios.get('http://localhost:3001/show_price_list').then(response => {
            setVal(response.data[0].list);
            console.log(response.data[0]);
        })
    }

    const updatePriceList = () => {
        axios.post('http://localhost:3001/update_price_list',
        {
            list: addData
        }).then(response => {
            console.log('work');
        })
    }

    useEffect( ()=> {
            showPriceList();
    }, [])

    return (
        <Container>
            <h2>Cennik</h2>
            <div className="main">
                <Popup name={alert} />
                <div className="title_container">
                    <Btn click={() => showData(!addedData)} name={addedData ? 'Ukryj podgląd' : 'Podgląd'} />
                </div>
                <CKEditor data={addData} onChange={handleChange}/>
                <div className="buttons_container">
                    <Btn name="Dodaj cennik" click={addPriceList}/>
                    <Btn name="Aktualizuj cennik" click={updatePriceList}/>
                </div>
                <div className="example">
                    {addedData ? ReactHtmlParser(addData) : ''}
                </div>
            </div>
        </Container>
    )
}
