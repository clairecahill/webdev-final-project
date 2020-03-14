/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';

export default function Search(props) {

    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [people, setPeople] = useState([]);


    function handleKeyDown(e) {
        if(e.key === 'Enter'){
            setSearchResults(e);
        }
    }

    async function setSearchResults(e) {
        // reset previous results
        setMovies([]);
        setTvShows([]);
        setPeople([]);

        e.preventDefault();
        const query = document.getElementById("movieSearch").value;
        let responseBody = {};

        // search for movies
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=a9de941ba40e3e48d10c7644969d4781&query=${query}&language=en-US&page=1&include_adult=false`
            );
            responseBody = await response.json();
            setMovies(responseBody.results);
        } catch(e) {
            console.log(e)
        }

        // search for TV shows
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=a9de941ba40e3e48d10c7644969d4781&query=${query}&language=en-US&page=1&include_adult=false`
            );
            responseBody = await response.json();
            setTvShows(responseBody.results);
        } catch(e) {
            console.log(e)
        }

        // search for people
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=a9de941ba40e3e48d10c7644969d4781&query=${query}&language=en-US&page=1&include_adult=false`
            );
            responseBody = await response.json();
            setPeople(responseBody.results);
        } catch(e) {
            console.log(e)
        }
    }

    function makeList(known_for){
        let list = "";
        
        for(let i = 0; i < known_for.length - 1; i++){
            if (!known_for[i].title) {
                list += known_for[i].name + ", "
            } else {
                list += known_for[i].title + ", "
            }
        }

        // add the last name or title without the comma
        if(!known_for[known_for.length - 1].title) {
            list += known_for[known_for.length - 1].name
        } else {
            list += known_for[known_for.length - 1].title
        }
        return list
    }

    const style = css`
        .data-row {
            &:hover {
                cursor: pointer;
            }
        }

        .input-label {
            display: block;
            font-size: 30px;
        }

        .form-control {
            width: 40%;
        }

        .header-box {
            position: relative;
            left: 25%;
        }

        .btn {
            margin-top: 5px;
        }
        
    `
    
    return(
        <div css={style}>
            <div className="header-box">
                <label className="input-label" for="movieSearch">Search for movies, TV shows, or people</label>
                <input onKeyDown={e => handleKeyDown(e)} class="form-control" type="search" id="movieSearch" placeholder="Search..."></input>
                <button type="button" className="btn btn-primary" onClick={e => setSearchResults(e)}>Search</button>
            </div>
                
                {movies.length > 0 ? 
                    <table className="table">
                        <h3>Movies</h3>
                        <tbody>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Release date</th>
                                <th scope="col">Popularity</th>
                            </tr>
                        {movies.map(m => 
                            <tr key={m.id} className="data-row"
                                onClick={() => window.location.href=`/movie/${m.id}`}>
                                <th scope="row">{m.title}</th>
                                <td>{m.release_date}</td>
                                <td>{m.popularity}</td>
                            </tr>
                        )}
                        </tbody>
                    </table> 
                : null}

                {tvShows.length > 0 ? 
                    <table className="table">
                        <h3>TV Shows</h3>
                        <tbody>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">First air date</th>
                                <th scope="col">Popularity</th>
                            </tr>
                        {tvShows.map(t => 
                            <tr key={t.id} className="data-row" 
                                onClick={() => window.location.href=`/tv/${t.id}`}>
                                <th scope="row">{t.name}</th>
                                <td>{t.first_air_date}</td>
                                <td>{t.vote_count}</td>
                            </tr>
                        )}
                        </tbody>
                    </table> 
                : null}

                {people.length > 0 ? 
                    <table className="table">
                        <h3>People</h3>
                        <tbody>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Known for</th>
                                <th scope="col">Popularity</th>
                            </tr>
                        {people.map(p => 
                            <tr key={p.id} className="data-row"
                                onClick={() => window.location.href=`/person/${p.id}`}>
                                <th scope="row">{p.name}</th>
                                <td>{makeList(p.known_for)}</td>
                                <td>{p.popularity}</td>
                            </tr>
                        )}
                        </tbody>
                    </table> 
                : null}

        </div>
    );
}