import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { Home, Movies, TvSeries, Favorites } from './pages'
import client from './config/graphql'
import { ApolloProvider } from '@apollo/client'

function App() {
  return (
    <ApolloProvider client={client}>
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/tvseries">Tv Series</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
      <div style={{
        margin: 0,
        padding: 0,
        width: '100%'
      }}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/movies" component={Movies}></Route>
          <Route exact path="/tvseries" component={TvSeries}></Route>
          <Route exact path="/favorites" component={Favorites}></Route>
        </Switch>
      </div>
    </ApolloProvider>
  )
}

export default App
