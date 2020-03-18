/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';

export default function TrendingTV(props) {
  const [tvShows, setTvShows] = useState([]);

  function handleKeyDown(e) {
      if(e.key === 'Enter'){
          setSearchResults(e);
      }
  }

  async function setSearchResults(e) {
      // reset previous results
      setTvShows([]);

      e.preventDefault();
      let responseBody = {};

      // search for TV shows
      try {
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/tv/week?api_key=a9de941ba40e3e48d10c7644969d4781&language=en-US&page=1&include_adult=false`
          );
          responseBody = await response.json();
          setTvShows(responseBody.results);
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
    text-align: center;
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
      <h1 css={trending}>Trending TV Shows of the Week.</h1>
        <tbody css={trending}><label className="input-label" for="movieSearch">Click to load trending TV Shows this week</label></tbody>
        <button css={buttonCss} onClick={e => setSearchResults(e)}>Load Shows</button>

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

      </div>
  );
  }
