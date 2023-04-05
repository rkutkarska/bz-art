import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserRole } from '../../services/usersService';

// TODO get currentUserRole
export const RequireAuth = ({ allowedRoles }) => {
    const { currentUser } = useAuth();
    const [currentUserRole, setCurrentUserRole] = useState('');

    let userId = '';
    if (currentUser) {
        userId = currentUser.uid;
    }

    console.log(currentUser.roles);
    useEffect(() => {
        getUserRole(userId)
            .then((res) => {
                setCurrentUserRole(x => x = res.role);
                console.log(res.role);
                // console.log('res role from function', res.role);
                console.log('res role from setter', currentUserRole);
            });
    }, [currentUserRole]);

    // console.log('allowedRoles', allowedRoles);
    console.log('currentUserRole', currentUserRole);

    return (
        currentUser && (allowedRoles === currentUserRole) ? <Outlet /> : <Navigate to="/login" />
    );
}