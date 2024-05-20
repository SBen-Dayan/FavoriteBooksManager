import { useUser } from "./UserContext"

export default function BookCard({ favoriteBookKeys, onAddClick, onRemoveClick,
    book }) {
    const { user } = useUser();

    const { key, title, author, coverImage } = book;
    return <>
        <div className="col-md-4 mb-3 card h-100">
            <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <img src={coverImage} className="card-img-top"
                    alt={title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">by {author}</p>
                {favoriteBookKeys.includes(key) ?
                    <button className="btn btn-danger mt-auto" onClick={() => onRemoveClick(key)}>
                        Remove from Favorites
                    </button> :
                    <button disabled={!user} className="btn btn-success mt-auto" onClick={() => onAddClick(book)}>
                        {user ? 'Add to Favorites' : 'Sign In to Add to Favorites'}
                    </button>}
            </div>
        </div>
    </>
}


