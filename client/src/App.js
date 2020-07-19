import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateApi from './components/CreateApi'
import EditApi from './components/EditApi'
import ApiList from './components/ApiList'

import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg'

function App() {
  return (
    <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img src={logo} width="30" height="30" alt="api logo" />
            <Link to="/" className="navbar-brand"> HONEY API</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link"> Apis</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Endpoint </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ApiList} />
          <Route path="/edit/:id" component={EditApi} />
          <Route path="/create" component={CreateApi} />
        </div>
      </Router>
  
      );
      
}

export default App;
