import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './reset.css';

import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Contacts } from './components/Contacts/Contacts';
import { ItemDescription } from './components/Items/ItemDescription/ItemDescription';
import { NotFound } from './components/NotFound/NotFound';
import { Forbidden } from './components/Forbidden/Forbidden';

import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

import { AdminPanel } from './components/CrudDocuments/AdminPanel';
import { CreateItem } from './components/CrudDocuments/CreateItem/CreateItem';
import { CreateCategory } from './components/CrudDocuments/CreateCategory/CreateCategory';
import { CreateMaterial } from './components/CrudDocuments/CreateMaterials/CreateMaterial';
import { ReadItem } from './components/CrudDocuments/ReadItem/ReadItem';
import { ReadCategory } from './components/CrudDocuments/ReadCategory/ReadCategory';
import { ReadMaterial } from './components/CrudDocuments/ReadMaterial/ReadMaterial';
import { ReadUser } from './components/CrudDocuments/ReadUser/ReadUser';
import { UpdateMaterial } from './components/CrudDocuments/UpdateMaterial/UpdateMaterial';
import { UpdateItem } from './components/CrudDocuments/UpdateItem/UpdateItem';
import { UpdateCategory } from './components/CrudDocuments/UpdateCategory/UpdateCategory';
import { UpdateUser } from './components/CrudDocuments/UpdateUser/UpdateUser';

import { ListItems } from './components/Items/ListItems/ListItems';
import { ListItemsByCategory } from './components/Items/ListItemsByCategory/ListItemsByCategory';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Favourites } from './components/Favourites/Favourites';
import { SuccessfullOrder } from './components/Orders/SuccessfullOrder';
import { OrdersHistory } from './components/Orders/OrdersHistory';
import { CurrentPromotion } from './components/Home/CurrentPromotion/CurrentPromotion';

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
                    <Route path="/current-promotion"  element={<CurrentPromotion />}/>
                    {/* --- End of Guest - public part* */}

                    {/* Regular user */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.user]} />}>
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/successful-order/:orderId" element={<SuccessfullOrder />} />
                        <Route path="/orders-history" element={<OrdersHistory />} />
                    </Route>
                    {/*  --- End of Regular user */}

                    {/* Moderator */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.moderator]} />}>
                        <Route path="/items" element={<ListItems />} />
                        <Route path="/admin-panel/create-item" element={<CreateItem />} />
                        <Route path="/admin-panel/update-item/:itemId" element={<UpdateItem />} />
                        <Route path="/admin-panel/create-category" element={<CreateCategory />} />
                        <Route path="/admin-panel/update-category/:categoryId" element={<UpdateCategory />} />
                        <Route path="/admin-panel/create-material" element={<CreateMaterial />} />
                        <Route path="/admin-panel/update-material/:materialId" element={<UpdateMaterial />} />
                    </Route>
                    {/* --- End of Moderator */}

                    {/* Moderator or Admin */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.moderator, usersRoles.admin]} />}>
                        <Route path="/admin-panel" element={<AdminPanel />} />
                        <Route path="/admin-panel/read-item/:itemId" element={<ReadItem />} />
                        <Route path="/admin-panel/read-category/:categoryId" element={<ReadCategory />} />
                        <Route path="/admin-panel/read-material/:materialId" element={<ReadMaterial />} />
                        <Route path="/admin-panel/read-user/:userId" element={<ReadUser />} />
                    </Route>
                    {/* --- End Moderator or Admin */}

                    {/* Admin */}
                    <Route element={<RequireAuth allowedRoles={[usersRoles.admin]} />}>
                        <Route path="/admin-panel/update-user/:userId" element={<UpdateUser />} />
                    </Route>
                    {/* --- End of Admin */}

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