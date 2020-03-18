/** @jsx jsx */
import React from 'react';
import {NavLink} from 'react-router-dom';
import {jsx, css} from '@emotion/core';

export default class Navbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showDD: false
        };

        this.handleHover = this.handleHover.bind(this);
        this.checkUrl = this.checkUrl.bind(this);
    }

    handleHover(){
        this.setState({
            showDD: !this.state.showDD
        });
    }

    checkUrl(){
        if(window.location.href.includes("trending")) {
            return "active"
        }
    }

    render(){
        const ulStyle = css`
            list-style-type: none;
            display: flex;
            justify-content: center;
            padding: 0px;
            width: 100%;
            background-color: #326273;
            position: relative;
            top: -16px;
            height: 76px;
            @media (max-width: 768px) {
              display: flex;
              flex-direction:row;
              height: 60px;
            }
        `
        const linkStyle = css`
            text-decoration: none;
            font-size: 25px;
            padding-left: 54px;
            padding-right: 54px;
            padding-top: 15px;
            color: white;
            display: flex;
            border-radius: 5px;

            &:hover {
                background-color: #e39774;
                color: #484848;
                cursor: pointer;
                height: 61px;
            }
            &.active {
                background-color: #e39774;
                color: #484848;
                height: 61px;
            }
            @media (max-width: 768px) {
              text-align: center;
              float: none;
              &:hover{
                background-color: #e39774;
                height: 45px;
              }
              &:focus{
                background-color: #e39774;
                height: 55px;
              }
              &.active {
                  background-color: #e39774;
                  color: #484848;
                  height: 45px;
              }
              top: 0;
              left: 0;
              transition: 0.5s;
            }
        `

        const dropdownStyle = css`
            background-color: #326273;
            color: white;
            height: 61px;

            @media (max-width: 768px){
              height: 61px;
              &:hover{
                background-color: #e39774;
                height: 61px;
              }
              &:focus{
                background-color: #e39774;
                height: 61px;
              }
              &.active {
                  background-color: #e39774;
                  color: #484848;
                  height: 61px;
              }

            }
        `
        return(
            <div>
                <ul css={ulStyle}>
                    <li>
                        <NavLink css={linkStyle} activeClassName="active" exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink css={linkStyle} activeClassName="active" to="/search">Search</NavLink>
                    </li>
                    <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                        <li className={this.checkUrl()} css={linkStyle}>Trending</li>
                        {this.state.showDD ?
                        <div className="dropdownContent">
                            <NavLink css={[linkStyle, dropdownStyle]} activeClassName="active" to="/trending/movies">Movies</NavLink>
                            <NavLink css={[linkStyle, dropdownStyle]} activeClassName="active" to="/trending/tv">TV Shows</NavLink>
                        </div> : null}
                    </div>
                </ul>
            </div>
        );
    }
}
