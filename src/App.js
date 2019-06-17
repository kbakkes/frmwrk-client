import React from 'react';
import './App.css';
import './css/tailwind.css';
import './css/grid.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderComponent from './components/headerComponent';
import BuilderComponent from './components/BuilderComponent';
import ConfirmComponent from "./components/ConfirmComponent";
import SollicitatieComponent from './components/SollicitatieComponent';

const Index = () => <h2>Welcome to the FRMWRK Builder</h2>;


function App() {
  return (
      <Router>
        <div className="App">
            <HeaderComponent />
        </div>

          <Route path="/" exact component={Index} />
          <Route name="builder" path="/edit/:sollicitatie/" component={BuilderComponent} />
          <Route name="builder" path="/confirm/:sollicitatie/" component={ConfirmComponent} />
          <Route name="builder" path="/sollicitatie/:sollicitatie/" component={SollicitatieComponent}/>
      </Router>
  );
}

export default App;
