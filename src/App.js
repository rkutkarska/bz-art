import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './styles/reset.css';

// import { ItemCounter } from './components/ItemCounter';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Contacts } from './components/Contacts/Contacts';
import { ItemDescription } from './components/ItemDescription/ItemDescription';
import { NotFound } from './components/NotFound/NotFound';

import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

import { CrudDocuments } from './components/AdminActions/CrudDocuments/CrudDocuments';
import { CreateItem } from './components/AdminActions/CrudDocuments/CreateItem/CreateItem';
import { CreateCategory } from './components/AdminActions/CrudDocuments/CreateCategory/CreateCategory';
import { CreateMaterial } from './components/AdminActions/CrudDocuments/CreateMaterials/CreateMaterial';
import { ReadItem } from './components/AdminActions/CrudDocuments/ReadItem/ReadItem';
import { ReadCategory } from './components/AdminActions/CrudDocuments/ReadCategory/ReadCategory';
import { ReadMaterial } from './components/AdminActions/CrudDocuments/ReadMaterial/ReadMaterial';
import { UpdateMaterial } from './components/AdminActions/CrudDocuments/UpdateMaterial/UpdateMaterial';
import { UpdateItem } from './components/AdminActions/CrudDocuments/UpdateItem/UpdateItem';
import { UpdateCategory } from './components/AdminActions/CrudDocuments/UpdateCategory/UpdateCategory';

import { ListItems } from './components/ListItems/ListItems';
import { ListItemsByCategory } from './components/ListItemsByCategory/ListItemsByCategory';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';

function App() {

    return (
        <AuthProvider>
            <div>
                <Header />
                <Routes>
                    {/* Regular user */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/items" element={<ListItems />} />
                    <Route path="/items/:itemId" element={<ItemDescription />} />
                    <Route path="/category/:categoryId/items" element={<ListItemsByCategory />} />
                    <Route path="/contacts" element={<Contacts />} />
                    {/* --- Regular user */}

                    <Route element={<RequireAuth />}>
                        {/* Admin */}
                        <Route path="/items" element={<ListItems />} />
                        <Route path="/crud-documents" element={<CrudDocuments />} />
                        <Route path="/crud-documents/create-item" element={<CreateItem />} />
                        <Route path="/crud-documents/update-item/:itemId" element={<UpdateItem />} />
                        <Route path="/crud-documents/read-item/:itemId" element={<ReadItem />} />
                        <Route path="/crud-documents/create-category" element={<CreateCategory />} />
                        <Route path="/crud-documents/update-category/:categoryId" element={<UpdateCategory />} />
                        <Route path="/crud-documents/read-category/:categoryId" element={<ReadCategory />} />
                        <Route path="/crud-documents/create-material" element={<CreateMaterial />} />
                        <Route path="/crud-documents/update-material/:materialId" element={<UpdateMaterial />} />
                        <Route path="/crud-documents/read-material/:materialId" element={<ReadMaterial />} />
                        {/* --- Admin */}

                        {/* Regular user */}
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        {/* Regular user */}
                    </Route>


                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                {/* <ItemCounter start = {1} /> */}
            </div>
        </AuthProvider>
    );
}

export default App;