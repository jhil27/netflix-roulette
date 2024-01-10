import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './searchForm.scss';

const SearchForm = ({initialSearchTerm, onChange}) => {
    const [searchedInput, setSearchedInput] = useState(initialSearchTerm);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchedInput(e.target.value);
    };
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        onChange(searchedInput);
    }
    return (
        <div className="search-container">
            <button className="add-movie-button"
                onClick={() => navigate('/new') }
            >
                + ADD MOVIE
            </button>
            <Outlet />
            <div className="search-banner">
            </div>
            <form className="search-form" onSubmit={handleSubmitSearch}>
                <input className="search-box" aria-label="search-box" value={searchedInput} placeholder="What do you want to watch" onChange={handleSearch} />
                <button className="btn-submit" onClick={handleSubmitSearch}>SEARCH</button>
            </form>
        </div>

    )
}
export default SearchForm;