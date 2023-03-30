import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const RequireAuth = () => {
    const { currentUser } = useAuth();

    return (
        currentUser ? <Outlet /> : <Navigate to="/login"/>
    );
}