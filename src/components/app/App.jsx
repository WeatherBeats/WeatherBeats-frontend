import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../../containers/home/Home';
import About from '../about/About';
import Header from '../header/Header';
import HowTo from '../instructions/HowTo';
import Player from '../player/Player';
import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/how-to" component={HowTo}/>
          <Route exact path="/about" component={About} />
          <Route 
            path="/player/:access_token/:refresh_token" 
            component={Player} />
        </Switch>
      </Router>
    </>
  );
}
