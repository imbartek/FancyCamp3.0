import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const TravelsContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;

    & h1{
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }

    & .post{
        display: flex;
        flex-flow: column;
        width: 60vw;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 3em;
        margin-bottom: 3em;
    }

    @media screen and (max-width: 768px){
        & .post{
             width: 90%;
             padding: 1.5em;
        }
    }
`

const Travels = () => {
    const [posts, setPosts] = useState([]);

    const showPosts = () => {
        axios.get('http://localhost:3001/show_posts').then((response) => {
            console.log(response.data);
            setPosts(response.data);
        });
    }

    useEffect( () => {
        window.scrollTo(0, 0);
        showPosts();
    },[]);

    return (
        <TravelsContainer>
            <h1>Podróże</h1>
            {posts.map((post) => {
                        return (
                            <div className="post">
                                <h2>{post.title}</h2>
                                {ReactHtmlParser(post.body)}
                            </div>
                        )
                    })}
        </TravelsContainer>
    );
}

export default Travels;
