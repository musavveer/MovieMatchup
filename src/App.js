import React, { useEffect, useState } from "react";
import "./css/App.css"

import SearchBar from "./components/SearchBar"
import Movies from "./components/Movies";
import Footer from "./components/Footer";

import LeftArrow from "./images/left-arrow.png"
import RightArrow from "./images/right-arrow.png"


const API_URL = 'http://www.omdbapi.com/?apikey=280b17cb'

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

   
    useEffect(() => {
        // eslint-disable-next-line
        searchMovies(searchTitle)
    }, [searchTitle, currentPage]);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title.trim()}&page=${currentPage}`);
            const data = await response.json();
            setMovies(data.Search)
        } catch (e) {
            setMovies([]);
            console.log(e.message);
        }
    };
    
    const handleSearchChange = (value) => {
        setSearchTitle(value);
        setCurrentPage(1); 
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1); 
    };

    const previousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        } 
        else {
            console.log("you are in first page");
        }
         
    };


    return (
        <div className="app">
            <h1 className="brand">Movie Matchup</h1>
            <span className="sub-heading">Discover your perfect movie match based on title or language preferences through Movie Matchup's extensive card catalog of films from around the world.</span>
            <SearchBar 
                value={searchTitle}
                onSearchChange={handleSearchChange}
                onSearch={searchMovies}
            />
            <div className="container">
                <Movies movies={movies}/>
            </div>
            
            <div className="btn-LR">
                <img className="arrow" onClick={previousPage} src={LeftArrow} alt="left-arrow"/>
                <h1 className="num">{currentPage}</h1>
                <img className="arrow" onClick={nextPage} src={RightArrow} alt="right-arrow"/>
            </div>

            <Footer />
        </div>
    );
}

export default App;