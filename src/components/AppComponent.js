import React from 'react';
import './App.css';
import './css/tailwind.css';
import './css/grid.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HeaderComponent from './components/headerComponent';
import BuilderComponent from './components/BuilderComponent';

function App() {
    return (
        <Router>
            <div className="App">
                <HeaderComponent />
                <BuilderComponent/>
            </div>
        </Router>
    );
}

export default App;
