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
import { ItemDescription } from './components/ItemDescription/ItemDescription';
import { NotFound } from './components/NotFound/NotFound';
import { AuthProvider } from './context/AuthContext';
import { CrudDocuments } from './components/AdminActions/CrudDocuments/CrudDocuments';
import { ListItems } from './components/ListItems/ListItems';
import { CreateCategory } from './components/CreateCategory/CreateCategory';
import { CreateMaterial } from './components/CreateMaterials/CreateMaterial';
import { ReadItem } from './components/AdminActions/CrudDocuments/ReadItem/ReadItem';
import { ReadCategory } from './components/AdminActions/CrudDocuments/ReadCategory/ReadCategory';
import { UpdateItem } from './components/AdminActions/CrudDocuments/UpdateItem/UpdateItem';
import { ListItemsByCategory } from './components/ListItemsByCategory/ListItemsByCategory';


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
                    <Route path="/update-item/:itemId" element={<UpdateItem />} />
                    <Route path="/create-category" element={<CreateCategory />} />
                    <Route path="/create-material" element={<CreateMaterial />} />
                    <Route path="/items" element={<ListItems />} />
                    <Route path="/items/:itemId" element={<ItemDescription />} />
                    <Route path="/crud-documents" element={<CrudDocuments />} />
                    <Route path="/read-item/:itemId" element={<ReadItem />} />
                    <Route path="/read-category/:categoryId" element={<ReadCategory />} />
                    <Route path="/category/:categoryId/items" element={<ListItemsByCategory />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                {/* <ItemCounter start = {1} /> */}
            </div>
        </AuthProvider>
    );
}

export default App;