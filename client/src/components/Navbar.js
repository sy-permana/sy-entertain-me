import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
  <>
    <nav className="nav-extended teal accent-4">
      <div className="nav-wrapper container">
        <a href="#home" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><Link to="/">Home</Link></li>
          <li>
            <Link className="dropdown-trigger" to="/movies" data-target="movieOptions">
              Movies
              <i className="material-icons right">arrow_drop_down</i>
            </Link>
          </li>
          <li><Link to="/tvseries">Tv Series</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>
      </div>
    </nav>

    <ul className="sidenav" id="mobile-demo">
      <li><Link to="/">Home</Link></li>
      <li>
        <Link className="dropdown-trigger" to="/movies" data-target="movieOptions2">
          Movies
          <i className="material-icons right">arrow_drop_down</i>
        </Link>
      </li>
      <li><Link to="/tvseries">Tv Series</Link></li>
      <li><Link to="/favorites">Favorites</Link></li>
    </ul>

    <ul id="movieOptions" className="dropdown-content">
      <li><Link to="/movies">Movie List</Link></li>
      <li><Link to="/add-movie">Add New Movie</Link></li>
    </ul>

    <ul id="movieOptions2" className="dropdown-content">
      <li><Link to="/movies">Movie List</Link></li>
      <li><Link to="/add-movie">Add New Movie</Link></li>
    </ul>
  </>
  )
}
