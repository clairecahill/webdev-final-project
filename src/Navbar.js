/** @jsx jsx */
import React from 'react';
import {NavLink} from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import TrendingTV from './TrendingTV';
import TrendingMovies from './TrendingMovies';
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
            padding: 0px;
            width: 100%;
            background-color: #484848;
            position: relative;
            top: -18px;
            height: 61px;
        `
        const linkStyle = css`
            text-decoration: none;
            font-size: 25px;
            padding: 14px;
            color: white;
            display: flex;
      
            &:hover {
                background-color: #B8B8B8;
                color: #484848;
                cursor: pointer;
            }
            &.active {
                background-color: #B8B8B8;
                color: #484848;
            }
        `

        const dropdownStyle = css`
            background-color: #484848;
            color: white;
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