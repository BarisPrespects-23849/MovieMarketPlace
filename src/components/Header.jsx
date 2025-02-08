import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <header className="bg-gray-900/90 backdrop-blur-md p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <Link 
        to="/" 
        className="text-red-600 text-3xl font-bold flex items-center"
        aria-label="MovieHub Home"
      >
        <span className="mr-2" role="img" aria-label="movie camera">🎬</span>
        MovieHub
      </Link>
      <nav className="flex-1 max-w-2xl mx-8">
        <SearchBar />
      </nav>
    </header>
  );
};

export default Header;
