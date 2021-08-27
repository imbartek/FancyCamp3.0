import React from 'react';
import { Link } from 'react-router-dom';

export default function NavAdmin() {
    return (
        <nav>
            <ul>
                <li><Link to="/reservation">Rezerwacje</Link></li>
                <li><Link to="/posts">Posty</Link></li>
                <li><Link to="/gallery">Galeria</Link></li>
            </ul>
        </nav>
    )
}
