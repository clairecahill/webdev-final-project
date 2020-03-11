/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {jsx, css} from '@emotion/core';

export default function Movie(props){
    const {id} = useParams();
    const [data, setData] = useState({});
    
    useEffect(() => {
        getMovieData();
    }, []);

    async function getMovieData(){
        let responseBody = {};

        // GET request for data
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=a9de941ba40e3e48d10c7644969d4781&language=en-US`
            );
            responseBody = await response.json();
            setData(responseBody);
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.overview}</p>
            <p>Popularity: {data.popularity}</p>
            <p>Release date: {data.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="poster" />
        </div> 
    )
}