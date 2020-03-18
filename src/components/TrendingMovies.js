/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';

export default function TrendingMovies(props) {

  const [movies, setMovies] = useState([]);

  function handleKeyDown(e) {
      if(e.key === 'Enter'){
          setSearchResults(e);
      }
  }

  async function setSearchResults(e) {
      // reset previous results
      setMovies([]);

      e.preventDefault();
      let responseBody = {};

      // search for movies
      try {
          const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=a9de941ba40e3e48d10c7644969d4781&language=en-US&page=1&include_adult=false`
          );
          responseBody = await response.json();
          setMovies(responseBody.results);
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
  const trending = css`
    display: flex;
    justify-content: center;
  `
  const buttonCss = css`
    background-color: #5c9ead;
    border-radius: 5px;
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
      <div css={[style, trending]}>
        <h1 css={trending}>Trending Movies of the Week.</h1>
        <tbody css={trending}> <label className="input-label" for="movieSearch">Click to load trending movies this week</label></tbody>
          <button css={buttonCss} onClick={e => setSearchResults(e)}>Load Movies</button>

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
                              <td css={results} >{m.title}</td>
                              <td css={results} >{m.release_date}</td>
                              <td css={results} >{m.popularity}</td>
                          </tr>
                      )}
                      </tbody>
                  </table>
              : null}

      </div>
  );
}
