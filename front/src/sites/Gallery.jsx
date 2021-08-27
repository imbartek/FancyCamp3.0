import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { colors } from '../utils/utils';
import axios from 'axios';

const GalleryContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;

    & h1{
        color: ${colors.gold};
        font-size: font-size: ${16 * 2.6 + "px"};
        margin: 3% 0;
    }
    & img {
        width: 50%;
        margin: 5% 0;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    @media screen and (max-width: 768px){
        & img{
             width: 80%;
        }
    }
`

const Gallery = () => {

    const [gallery, setGallery] = useState([]);

    const showGallery = () => {
        axios.get("http://localhost:3001/show_gallery").then((response) => {
            console.log(response.data);
            setGallery(response.data);
        }
        )}

    useEffect(() => {
        window.scrollTo(0, 0);
        showGallery();
    }, [])

    return (
        <GalleryContainer>
            <h1>Galeria</h1>
            {gallery.map((photo, key = photo.id) => {
                return <img src={photo.link} alt={`photo_${key}`} />
            })}
        </GalleryContainer>
    );
}

export default Gallery;
