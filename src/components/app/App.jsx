import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from '../../containers/home/Home';
import About from '../about/About';
import Header from '../header/Header';
import FaqList from '../instructions/FaqList';
import Player from '../player/Player';
import './App.css';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/faq" component={FaqList}/>
          <Route exact path="/about" component={About} />
          <Route exact path="/player" component={Player} />
          <Route 
            path="/player/:access_token/:refresh_token" 
            component={Player} />
        </Switch>
      </Router>
    </>
  );
}
