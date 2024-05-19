import { useState, useEffect } from "react"
import axios from "axios";
import BookCard from "../components/BookCard";
import { useUser } from "../components/UserContext";

export default function Search() {
    const { user } = useUser();
    const limit = 15;
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [books, setBooks] = useState([]);
    const [favoriteBookKeys, setFavoriteBookKeys] = useState([]);

    const onSubmit = async e => {
        setIsSearching(true);
        e.preventDefault();
        const { data } = await axios.get(`/api/books/search?query=${searchText}`);
        setBooks(data);
        setIsSearching(false);
    }

    const onAddClick = async ({ key, title, author, coverImage }) => {
        await axios.post('/api/books/addToFavorites', { key, title, author, coverImage });
        setFavoriteBookKeys([...favoriteBookKeys, key])
    }

    const onRemoveClick = async key => {
        await axios.post('/api/books/removeFromFavorites', { key });
        setFavoriteBookKeys(favoriteBookKeys.filter(k => k !== key));
    }

    useEffect(() => {
        (async function () {
            if (user) {
                const { data } = await axios.get('/api/books/getFavoriteBookKeys');
                setFavoriteBookKeys(data);
            }
            const { data } = await axios.get(`/api/books/GetTopFavorites?limit=${limit}`);
            setBooks(data);
        })();
    }, [])

    return <>
        <h2>Search for Books</h2>
        <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter book title, author, or ISBN"
                    value={searchText} onChange={({ target: { value } }) => setSearchText(value)} />
                <button className="btn btn-primary">Search</button>
            </div>
        </form>
        <div className="row">
            {!isSearching && <h2 className="text-center py-3 mt-3">Top Favorite Books</h2>}
            {!!books.length && books.map(b => <BookCard
                book={b}
                onAddClick={onAddClick}
                onRemoveClick={onRemoveClick}
                favoriteBookKeys={favoriteBookKeys}
                key={b.key} />)}
            {isSearching && <div className="spinner-border text-primary justify-content-center" role="status" style={{ width: '5rem', height: '5rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>}
        </div>
    </>
}