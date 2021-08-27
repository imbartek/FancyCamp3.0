import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainSite from './sites/MainSite';
import About from './sites/About';
import Calendar from './sites/Calendar';
import Contact from './sites/Contact';
import Gallery from './sites/Gallery';
import Travels from './sites/Travels';
import Price from './sites/Price';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './sites/Login';
import Admin from './sites/Admin/Admin';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={MainSite} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/about" component={About} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/price" component={Price} />
          <Route path="/travels" component={Travels} />
          <Route path="/contact" component={Contact} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
