import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBookCard from "../components/FavoriteBookCard";
import { Link } from "react-router-dom";

export default function Favorites() {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        refresh();
    }, [])

    const refresh = async () => {
        const { data } = await axios.get('/api/books/getFavorites');
        setFavoriteBooks(data);
    }

    const onRemoveClick = async id => {
        await axios.post('/api/books/removeFromFavorites', { id });
        setFavoriteBooks(favoriteBooks.filter(f => f.id !== id));
    }

    return <>
        <h2 className="mb-4 text-primary">My Favorites</h2>
        <div className="row">
            {favoriteBooks.length ?
                favoriteBooks.map(b =>
                    <FavoriteBookCard
                        favoriteBook={b}
                        onRemoveClick={onRemoveClick}
                        refresh={refresh}
                        key={b.id} />) :
                <Link to="/search" style={{ textDecoration: 'none', color: 'black' }}>
                    <h4>Nothing here yet, start adding books to your library!</h4>
                </Link>}
        </div>
    </>
}