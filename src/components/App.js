import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar.js'
import Home from './Home';
import Search from './Search';
import TrendingTV from './TrendingTV';
import TrendingMovies from './TrendingMovies';
import Movie from './Movie'
import TVShow from './TVShow'
import Person from './Person'
import Lost from './Lost'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/trending/movies">
                <TrendingMovies />
            </Route>
            <Route path="/trending/tv">
                <TrendingTV />
            </Route>
            <Route path="/movie/:id">
              <Movie />
            </Route>
            <Route path="/tv/:id">
              <TVShow />
            </Route>
            <Route path="/person/:id">
              <Person />
            </Route>
            <Route path="*">
              <Lost />
            </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
