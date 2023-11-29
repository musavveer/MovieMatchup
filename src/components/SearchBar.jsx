import React from "react";
import SearchIcon from "../images/search-icon.png";

const SearchBar = ({value, onSearch, onSearchChange}) => {
    return(
        
        <form onSubmit={(e) => e.preventDefault()} className="search">
            <input
                placeholder = "Search movies..."
                value = {value}
                onChange = {(e) => onSearchChange(e.target.value)}
            />

            <button type="submit" onClick={() => onSearch(value)}>
                <img src={SearchIcon} alt="Search Logo" />
            </button>
        </form>
    );
}

export default SearchBar;