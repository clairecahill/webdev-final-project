/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {jsx, css} from '@emotion/core';

export default function Person(props){
    const {id} = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        getPersonData();
    }, []);

    async function getPersonData(){
        let responseBody = {};

        // GET request for data
        try {
            const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=a9de941ba40e3e48d10c7644969d4781&language=en-US`
            );
            responseBody = await response.json();
            setData(responseBody);
        } catch(e) {
            console.log(e)
        }
    }

    const detail = css`
      padding: 15px;
    `
    return (
        <div css={detail}>
            <h1>{data.name}</h1>
            <p>{data.biography}</p>
            <p><b>Popularity: </b>{data.popularity}</p>
            <p><b>Birthday: </b>{data.birthday}</p>
            <p><b>Place of birth:</b> {data.place_of_birth}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt="poster" />
        </div>
    )
}
