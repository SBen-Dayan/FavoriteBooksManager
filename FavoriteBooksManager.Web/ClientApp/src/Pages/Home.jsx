import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";

export default function Home() {
    const { user } = useUser();

    return <>
        <div className="text-center">
            <div className="p-5 mb-4 bg-light rounded-3 mt-5">
                <h1 className="display-4">Welcome to React Favorite Books!</h1>
                <p className="lead">Your personal library tracker. Search for books, add them to your personal library, and manage your collection with ease.</p>
                {!user &&
                    <h3>
                        <Link to="/signup">signup</Link> or <Link to="/login">login</Link> to start building your personal library!
                    </h3>}
                {user && <h3>Search for books and build your personal library!</h3>}
                <Link to="/search" className="mt-2 btn btn-primary btn-lg">Search for Books</Link>

            </div>
        </div>
    </>
}