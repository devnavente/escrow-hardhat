import { Link } from 'react-router-dom';

function Header({ account }) {
    return (
        <header className="w-full bg-green-300">
            <nav className="w-9/12 m-auto max-w-3xl p-2 flex justify-between flex-wrap gap-5" role="main navigation">
                <Link to="/" className="hover:underline">
                    Home
                </Link>

                <div className="flex gap-5 flex-wrap">
                    <Link to={`/profile/${account}`} className="hover:underline">My profile</Link>
                    <Link to="/courses/publish" className="hover:underline">Publish course</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;