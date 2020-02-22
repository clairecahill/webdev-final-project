/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';

export default function Search(props) {
    // const [inputQuery, setInputQuery] = useState("")

    async function setSearchResults() {
        const query = document.getElementById("movieSearch").value;
        let responseBody = {};

        // try {
        //     const response = await fetch()
        // }
    }

    const labelStyle = css`
        display: block;
    `
    
    return(
        <div>
            <label css={labelStyle} for="movieSearch">Search for movies, TV shows, or people</label>
            <input type="search" id="movieSearch" placeholder="Search..."></input>
            <button onClick={setSearchResults}>Search</button>
        </div>
    );
}