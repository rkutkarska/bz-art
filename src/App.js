import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './styles/reset.css';

import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Contacts } from './components/Contacts/Contacts';
import { ItemDescription } from './components/ItemDescription/ItemDescription';
import { NotFound } from './components/NotFound/NotFound';
import {Forbidden } from './components/Forbidden/Forbidden';

import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

import { CrudDocuments } from './components/CrudDocuments/CrudDocuments';
import { CreateItem } from './components/CrudDocuments/CreateItem/CreateItem';
import { CreateCategory } from './components/CrudDocuments/CreateCategory/CreateCategory';
import { CreateMaterial } from './components/CrudDocuments/CreateMaterials/CreateMaterial';
import { ReadItem } from './components/CrudDocuments/ReadItem/ReadItem';
import { ReadCategory } from './components/CrudDocuments/ReadCategory/ReadCategory';
import { ReadMaterial } from './components/CrudDocuments/ReadMaterial/ReadMaterial';
import { UpdateMaterial } from './components/CrudDocuments/UpdateMaterial/UpdateMaterial';
import { UpdateItem } from './components/CrudDocuments/UpdateItem/UpdateItem';
import { UpdateCategory } from './components/CrudDocuments/UpdateCategory/UpdateCategory';

import { ListItems } from './components/ListItems/ListItems';
import { ListItemsByCategory } from './components/ListItemsByCategory/ListItemsByCategory';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Favourites } from './components/Favourites/Favourites';

function App() {
    const usersRoles = {
        admin: 0,
        moderator: 1,
        user: 2
    }

    return (
        <AuthProvider>
            <div>
                <Header />
                <Routes>
                    {/* Guest - public part*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/items" element={<ListItems />} />
                    <Route path="/items/:itemId" element={<ItemDescription />} />
                    <Route path="/category/:categoryId/items" element={<ListItemsByCategory />} />
                    <Route path="/contacts" element={<Contacts />} />
                    {/* --- End of Guest - public part* */}

                    {/* Regular user */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.user]} />}>
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/favourites" element={<Favourites />} />
                        {/* Favourites list */}
                    </Route>
                    {/*  --- End of Regular user */}

                    {/* Admin */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.admin]} />}>
                        <Route path="/items" element={<ListItems />} />
                        {/* <Route path="/crud-documents" element={<CrudDocuments />} /> */}
                        <Route path="/crud-documents/create-item" element={<CreateItem />} />
                        <Route path="/crud-documents/update-item/:itemId" element={<UpdateItem />} />
                        {/* <Route path="/crud-documents/read-item/:itemId" element={<ReadItem />} /> */}
                        <Route path="/crud-documents/create-category" element={<CreateCategory />} />
                        <Route path="/crud-documents/update-category/:categoryId" element={<UpdateCategory />} />
                        {/* <Route path="/crud-documents/read-category/:categoryId" element={<ReadCategory />} /> */}
                        <Route path="/crud-documents/create-material" element={<CreateMaterial />} />
                        <Route path="/crud-documents/update-material/:materialId" element={<UpdateMaterial />} />
                        {/* <Route path="/crud-documents/read-material/:materialId" element={<ReadMaterial />} /> */}
                    </Route>
                    {/* --- End of Admin */}

                    {/* Moderator or Admin */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.moderator, usersRoles.admin]} />}>
                        <Route path="/crud-documents" element={<CrudDocuments />} />
                        <Route path="/crud-documents/read-item/:itemId" element={<ReadItem />} />
                        <Route path="/crud-documents/read-category/:categoryId" element={<ReadCategory />} />
                        <Route path="/crud-documents/read-material/:materialId" element={<ReadMaterial />} />
                        {/* Orders list */}
                    </Route>
                    {/* --- End Moderator or Admin */}

                    {/* For all */}
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />
                    {/* --- For all */}

                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;