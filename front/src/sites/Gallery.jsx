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

    const [tmpGallery, setTmpGallery] = useState([]);

    const showGallery =  () => {
        axios.get("http://localhost:3001/show_gallery").then( (response) => {

            const arrayOfImages = [];
            response.data.forEach( element => {
                const oneImage = element.image;
                const convertedImage = Buffer.from(oneImage, 'binary').toString('base64');
                arrayOfImages.push(convertedImage)
            });
            setTmpGallery(arrayOfImages);
        });
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        showGallery();
    }, [])

    return (
        <GalleryContainer>
            <h1>Galeria</h1>
            {tmpGallery.map((image, key = image) => {
                return <img src={`data:image/jpeg;base64,${image}`} alt={`photo_${key}`} key={key}/>
            })}
        </GalleryContainer>
    );
}

export default Gallery;
