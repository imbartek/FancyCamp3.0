import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reservation() {

    const [reservations, setResevations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/show_reservation").then((response) => {
            setResevations(response.data);
        });
    }, []);

    const handleApprove = (e) => {
        let index = e.target.parentNode.id;
        axios.post("http://localhost:3001/change_status",
            {
                id: ++index,
                status: 'green'
            }).then((response) => {
                const str = response.config.data;
                const firstTry = str.split(':');
                const secondTry = firstTry[2].split('}');
                const thirdTry = secondTry[0].split('"');
                e.target.parentNode.style.backgroundColor = thirdTry[1];
            });
    }

    const handleDisApprove = (e) => {
        let index = e.target.parentNode.id;
        axios.post("http://localhost:3001/change_status",
            {
                id: ++index,
                status: 'red'
            }).then((response) => {
                const str = response.config.data;
                const firstTry = str.split(':');
                const secondTry = firstTry[2].split('}');
                const thirdTry = secondTry[0].split('"');
                e.target.parentNode.style.backgroundColor = thirdTry[1];
            });
    }

    const handleReset = (e) => {
        let index = e.target.parentNode.id;
        axios.post("http://localhost:3001/change_status",
            {
                id: ++index,
                status: 'white'
            }).then((response) => {
                const str = response.config.data;
                const firstTry = str.split(':');
                const secondTry = firstTry[2].split('}');
                const thirdTry = secondTry[0].split('"');
                e.target.parentNode.style.backgroundColor = thirdTry[1];
            });
    }
    return (
            <div className="panel">
                <h1>Najnowsze Rezerwacje</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Telefon</th>
                            <th>Od</th>
                            <th>Do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, key) => {
                            return (
                                <tr key={reservation.id}
                                    id={key}
                                    style={{ backgroundColor: reservation.status }}
                                >
                                    <td>{key + 1}</td>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.surname}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.fromDate.split("T")[0]}</td>
                                    <td>{reservation.toDate.split("T")[0]}</td>
                                    <td onClick={handleApprove} className="btn">A</td>
                                    <td onClick={handleDisApprove} className="btn">D</td>
                                    <td onClick={handleReset} className="btn">0</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}
