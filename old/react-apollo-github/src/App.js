/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */

import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import About from './About'
import GitHubQuery from './GitHubQuery'
import GitHubQuery2 from './GitHubQuery2'
import GitHubQuery3 from './GitHubQuery3'
import Example from './Example'


const App = () => {
  // const [  ]

  return (
    
  <Router>
    <div>
      <div><Link to="/About">About</Link></div>
      <div><Link to="/">GitHub</Link></div>
      <div><Link to="/github-2">GitHub 2</Link></div>
      <div><Link to="/github-3">GitHub 3</Link></div>

      <Route path="/about" component={About} />
      <Route exact path="/" component={GitHubQuery} />
      <Route path="/github-2" component={GitHubQuery2} />
      <Route path="/github-3" component={GitHubQuery3} />
     </div>
   </Router>
)}

export default App
