import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './styles/reset.css';

// import { ItemCounter } from './components/ItemCounter';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { CreateItem } from './components/CreateItem/CreateItem';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { UpdateItem } from './components/UpdateItem';
import { ItemDescription } from './components/ItemDescription/ItemDescription';
import { NotFound } from './components/NotFound/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ListDocuments } from './components/AdminActions/ListDocuments/ListDocuments';
import { ListItems } from './components/ListItems/ListItems';
import { CreateCategory } from './components/CreateCategory/CreateCategory';
import { CreateMaterial } from './components/CreateMaterials/CreateMaterial';

function App() {

    return (
        <AuthProvider>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-item" element={<CreateItem />} />
                    <Route path="/update-item" element={<UpdateItem />} />
                    <Route path="/create-category" element={<CreateCategory />} />
                    <Route path="/create-material" element={<CreateMaterial />} />
                    <Route path="/items" element={<ListItems />} />
                    <Route path="/items/:itemId" element={<ItemDescription />} />
                    <Route path="/list-documents" element={<ListDocuments />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                {/* <ItemCounter start = {1} /> */}
            </div>
        </AuthProvider>
    );
}

export default App;