import './App.css';
import './styles/reset.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import { ItemCounter } from './components/ItemCounter';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <ItemCounter start = {1} /> */}
      </Routes>
    </div>
  );
}

export default App;