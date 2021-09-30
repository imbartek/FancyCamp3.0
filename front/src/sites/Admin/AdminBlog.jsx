import React, { useState, useEffect } from 'react';
import CKEditor from 'ckeditor4-react';
import ReactHtmlParser from 'react-html-parser';
import Btn from '../../components/Btn';
import axios from 'axios';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const ContainerBlog = styled.div`
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

export default function AdminBlog() {
    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [idPost, setIdPost] = useState(0);
    const [alert, setAlert] = useState("");

    const handleChange = (e) => {
        const data = e.editor.getData();
        setVal(data);
    }

    const addPost = () => {
        axios.post('http://localhost:3001/add_post',
            {
                title: title,
                details: addData
            }).then((response) => {
                setAlert("Post dodany");
                showPopUp(alert);
                showPosts();
                setVal("");
                setTitle("");
            });
    }

    const showPosts = () => {
        axios.get('http://localhost:3001/show_posts').then((response) => {
            setPosts(response.data);
        });
    }

    const editPostValue = (id, index) => {
        setTitle(posts[index - 1].title)
        setVal(posts[index - 1].body);
        setIdPost(id);
    }

    const updatePost = () => {
        axios.post('http://localhost:3001/edit_post',
            {
                id: idPost,
                title: title,
                details: addData
            }).then((response) => {
                showPosts();
                setVal("");
                setTitle("");
                setAlert("Post edytowany");
                showPopUp(alert);
            });
    }

    const showPopUp = (alert) => {
        const popUp = document.querySelector('.popup');
        popUp.animate([
            {bottom: '0%', opacity: 0},
            {bottom: '50%', opacity: 1},
            {bottom: '50%', opacity: 1},
            {bottom: '0%', opacity: 0},
            {bottom: '-50%'},
        ], {
            duration: 4000,
        })
    }

    const deletePost = (id) => {
        axios.post('http://localhost:3001/delete_post',
            {
                id: id,
            }).then((response) => {
                setAlert("Post usunięty");
                showPopUp(alert);
                showPosts();
            });
    }

    useEffect(() => {
        showPosts()
    }, [])

    return (
        <ContainerBlog>
            <h2>Edytor</h2>
            <div className="main">
                <Popup name={alert}/>
                <div className="title_container">
                    <input type="text" value={title} placeholder="Tytuł" onChange={e => setTitle(e.target.value)} />
                    <Btn click={() => showData(!addedData)} name={addedData ? 'Ukryj podgląd' : 'Podgląd'} />
                </div>
                <CKEditor data={addData} onChange={handleChange} />
                <div className="buttons_container">
                    <Btn name="Dodaj post" click={addPost} />
                    <Btn name="Aktualizuj post" click={updatePost} />
                </div>
                <div className="example">
                    {addedData ? ReactHtmlParser(addData) : ''}
                </div>
            </div>
            <table border="1" cellPadding="1" cellSpacing="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Akcja</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index = 1) => {
                        return (
                            <tr key={post.id}>
                                <td>{index += 1}</td>
                                <td>{post.title}</td>
                                <td>
                                    <button onClick={() => editPostValue(post.id, index)}>Edytuj</button>
                                    <button onClick={() => deletePost(post.id)}>Usuń</button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </ContainerBlog>
    )
}
