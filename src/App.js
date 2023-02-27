import './App.css';
import './styles/reset.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import { ItemCounter } from './components/ItemCounter';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { CreateItem } from './components/CreateItem';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItem" element={<CreateItem />} />
        {/* <ItemCounter start = {1} /> */}
      </Routes>
    </div>
  );
}

export default App;