/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';
import Pic from '../lordVader.jpg'

export default function Search(props) {

    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [people, setPeople] = useState([]);
    const [noResults, setNoResults] = useState(false);


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
        setNoResults(false);

        e.preventDefault();
        const query = document.getElementById("movieSearch").value;
        let responseBody = {};
        let noMovies, noTV, noPeople = false;

        // search for movies
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=a9de941ba40e3e48d10c7644969d4781&query=${query}&language=en-US&page=1&include_adult=false`
            );
            responseBody = await response.json();
            setMovies(responseBody.results);
            if(responseBody.total_results === 0) {
                noMovies = true;
            }
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
            if(responseBody.total_results === 0) {
                noTV = true;
            }
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
            if(responseBody.total_results === 0) {
                noPeople = true;
            }
        } catch(e) {
            console.log(e);
        }

        if(noMovies && noTV && noPeople){
            setNoResults(true);
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        .data-row {
            &:hover {
                cursor: pointer;
            }
        }

        .input-label {
            display: block;
        }
    `
    const search = css`
      display: flex;
      justify-content: center;
    `
    const searchbar = css`
      border-radius: 5px;
    `
    const buttonCss = css`
      background-color: #5c9ead;
    `
    const headings = css`
      text-align: justify;
      padding: 5px;
    `
    const results = css`
      padding: 5px;
      padding-left: 25px;
      &:hover{
        background-color: #5c9ead;
        height: 10px;
      }
    `
    return(
        <div css={[style, search]}>
            <h1 css={search}><label className="input-label" for="movieSearch">Search for movies, TV shows, or people</label></h1>
            <h1 css={search}><input css={searchbar} onKeyDown={e => handleKeyDown(e)} type="search" id="movieSearch" placeholder="Search..."></input>
            <button css={[searchbar, buttonCss]} onClick={e => setSearchResults(e)}>Search</button>
            </h1>
                {movies.length > 0 ?
                    <table css={headings}>
                        <h3>Movies</h3>
                        <tbody>
                            <tr css={headings}>
                                <th>Title</th>
                                <th>Release date</th>
                                <th>Popularity</th>
                            </tr>
                        {movies.map(m =>
                            <tr css={results} key={m.id} className="data-row"
                                onClick={() => window.location.href=`/movie/${m.id}`}>
                                <td css={results}>{m.title}</td>
                                <td css={results}>{m.release_date}</td>
                                <td css={results}>{m.popularity}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                : null}

                {tvShows.length > 0 ?
                    <table css={headings}>
                        <h3>TV Shows</h3>
                        <tbody>
                            <tr css={headings}>
                                <th>Title</th>
                                <th>First air date</th>
                                <th>Popularity</th>
                            </tr>
                        {tvShows.map(t =>
                            <tr css={results} key={t.id} className="data-row"
                                onClick={() => window.location.href=`/tv/${t.id}`}>
                                <td css={results}>{t.name}</td>
                                <td css={results}>{t.first_air_date}</td>
                                <td css={results}>{t.vote_count}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                : null}

                {people.length > 0 ?
                    <table css={headings}>
                        <h3>People</h3>
                        <tbody>
                            <tr css={headings}>
                                <th>Name</th>
                                <th>Known for</th>
                                <th>Popularity</th>
                            </tr>
                        {people.map(p =>
                            <tr css={results} key={p.id} className="data-row"
                                onClick={() => window.location.href=`/person/${p.id}`}>
                                <td css={results}>{p.name}</td>
                                <td css={results}>{makeList(p.known_for)}</td>
                                <td css={results}>{p.popularity}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                : null}

                {noResults ?
                    <div>
                        <p><i>"Lord Vader, our ships have completed their scan and found nothing."</i></p>
                        <img src={Pic} alt="Lord Vader..."/>
                    </div>
                    :null
                }

        </div>
    );
}
