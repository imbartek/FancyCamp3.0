import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AdminGallery() {

    const [gallery, setGallery] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");


    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:3001/upload",
                formData
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    const showGallery = () => {
        axios.get("http://localhost:3001/show_gallery").then((response) => {
            console.log(response.data);
            setGallery(response.data);
        }
        )
    };

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
                </tbody>
            </table>
            <form onSubmit={uploadFile}>
                <input type="file" name="pic" onChange={saveFile} />
                <input type="submit" value="Dodaj zdjęcie" />
            </form>
        </div>
    )
}
