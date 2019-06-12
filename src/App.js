import React from 'react';
import './App.css';
import './css/tailwind.css';
import './css/grid.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HeaderComponent from './components/headerComponent';
import BuilderComponent from './components/BuilderComponent';

const Index = () => <h2>Welcome to the FRMWRK Builder</h2>;


function App() {
  return (
      <Router>
        <div className="App">
            <HeaderComponent />
        </div>

          <Route path="/" exact component={Index} />
          <Route name="builder" path="/:sollicitatie/" component={BuilderComponent} />


      </Router>
  );
}

export default App;
