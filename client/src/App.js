import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import {
  Home,
  Movies,
  TvSeries,
  Favorites,
  Detail,
  Addpage,
  Editpage
} from './pages'
import Navbar from './components/Navbar'
import client from './config/graphql'
import { ApolloProvider } from '@apollo/client'
import M from 'materialize-css'

function App() {
  useEffect (() => {
    M.AutoInit()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/movies/:id">
            <Detail group={'movies'} />
          </Route>
          <Route path="/tvseries/:id">
            <Detail group={'series'} />
          </Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/tvseries" component={TvSeries}></Route>
          <Route path="/favorites" component={Favorites}></Route>
          <Route path="/add-movie" component={Addpage}></Route>
          <Route path="/edit-movie/:id" component={Editpage}></Route>
        </Switch>
      </div>
    </ApolloProvider>
  )
}

export default App
