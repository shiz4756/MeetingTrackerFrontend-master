
import React, {useState} from 'react';
import './App.css';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import Test from './Test.js'
import {useSelector, useDispatch} from 'react-redux';
import {startLogIn,} from './actions.js';

function App() {
  return(
    <div>
    <Switch>
          <Route path="/test">
            <Test></Test>
          </Route>
          <Route exact path="/">
            <Link to="/test">TEST</Link>
          </Route>
    </Switch>
    </div>
  );
}

export default App;