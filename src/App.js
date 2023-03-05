import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './styles/reset.css';

// import { ItemCounter } from './components/ItemCounter';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { CreateItem } from './components/CreateItem/CreateItem';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { UpdateItem } from './components/UpdateItem';
import { NotFound } from './components/NotFound/NotFound';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItem" element={<CreateItem />} />
        <Route path="/updateItem" element={<UpdateItem />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      {/* <ItemCounter start = {1} /> */}
    </div>
  );
}

export default App;