import React from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Search from './Search'
import Trending from './Trending'

export default class Navbar extends React.Component {
    render(){
        return(
            <div>
                <ul>
                    <li>
                        <NavLink exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/trending">Trending</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/trending">
                        <Trending />
                    </Route>
                </Switch>
            </div>
        );
    }
}