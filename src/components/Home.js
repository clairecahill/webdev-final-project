/** @jsx jsx */
import React from 'react';
import {jsx, css} from '@emotion/core';

export default class Home extends React.Component {
    render(){

      const intro = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 720px;
      `
        return(
            <div css={intro}>
              <h1>Welcome!</h1>
              <h2>Try searching for a movie or show, or check out what's trending!</h2>
            </div>
        );
    }
}
