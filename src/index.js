import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import {Provider} from 'react-redux'; 
import storeExport from './store.js';
import {BrowserRouter} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
 import { BrowserRouter as Router, Route } from 'react-router-dom';
 import Login from './Login-page/Login';
 import Schedule from './Schedule/index';
 import Candidate from './Candidate/index';
 import Home from './Home/index'
import 'antd/dist/antd.css';

let storeExportVals = storeExport(); 

ReactDOM.render(
    <React.StrictMode>
    <Provider store={storeExportVals.store}>
      <PersistGate loading={null} persistor={storeExportVals.persistor}>
        <BrowserRouter>
         <div className="App">
            <Route exact path="/" component={Login} />
            <Route path="/Home" component = {Home}/>
            <Route path="/candidate" component={Candidate} />
            <Route path="/schedule" component={Schedule} />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// <Router>

// </Router>,