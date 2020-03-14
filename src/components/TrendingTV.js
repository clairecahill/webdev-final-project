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
      .data-row {
          &:hover {
              cursor: pointer;
          }
      }

      .input-label {
          display: block;
      }
  `

  return(
      <div css={style}>
      <h1>Trending TV Shows of the Week.</h1>
        <label className="input-label" for="movieSearch">Click to load trending TV Shows this week</label>
        <button onClick={e => setSearchResults(e)}>Load Shows</button>

              {tvShows.length > 0 ?
                  <table>
                      <h3>TV Shows</h3>
                      <tbody>
                          <tr>
                              <th>Title</th>
                              <th>First air date</th>
                              <th>Popularity</th>
                          </tr>
                      {tvShows.map(t =>
                          <tr key={t.id} className="data-row"
                              onClick={() => window.location.href=`/tv/${t.id}`}>
                              <td>{t.name}</td>
                              <td>{t.first_air_date}</td>
                              <td>{t.vote_count}</td>
                          </tr>
                      )}
                      </tbody>
                  </table>
              : null}

      </div>
  );
  }
