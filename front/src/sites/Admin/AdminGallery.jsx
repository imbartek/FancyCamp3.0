import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function AdminGallery() {

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
        <div className="panel">
                <h1>Galeria</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Link</th>
                            <th>Tytuł</th>
                        </tr>
                    </thead>
                    <tbody>
                    {gallery.map((img, key) => {
                            return (
                                <tr key={img.id}
                                    id={key}
                                >
                                    <td>{key + 1}</td>
                                    <td>{img.link}</td>
                                    <td>{img.title}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td><input type="text" /></td>
                            <input type="file" name="file" id="file" />
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}
