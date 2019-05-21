import React from 'react';
import './App.css';
import './css/tailwind.css'
import './css/grid.css'
import HeaderComponent from './components/headerComponent';
import BuilderComponent from './components/BuilderComponent';

function App() {
  return (
    <div className="App">
        <HeaderComponent />
        <BuilderComponent/>
    </div>
  );
}

export default App;
