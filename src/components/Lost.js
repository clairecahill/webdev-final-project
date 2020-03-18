/** @jsx jsx */
import React from 'react';
import {jsx, css} from '@emotion/core';
import Pic from '../thatsAll.jpeg';

export default class Lost extends React.Component {
    render(){
      const error = css`
        text-align: center;
      `
        return(
            <div css={error}>
              <h1>Whoops!</h1>
              <div><img src={Pic} alt="That's All Folks!"/></div>

              <div>You found a 404 error.  That page couldn't be found, please try another page!</div>
            </div>
        );
    }
}
