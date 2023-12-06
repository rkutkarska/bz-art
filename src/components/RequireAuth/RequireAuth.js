import React, { useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserData } from '../../services/usersService';

export const RequireAuth = (allowedRoles) => {
    const {currentUser} = useAuth();

    const roles = allowedRoles.allowedRoles;

    const userRef = useRef(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const roleRef = useRef(null);
    const [isRoleLoaded, setIsRoleLoaded] = useState(false);


    if (userRef.current && roles.includes(roleRef.current)) {
        return <Outlet />
    } else if (userRef.current && isRoleLoaded && !roles.includes(roleRef.current)) {
        return <Navigate to="/forbidden" />
    } else {
        if (isUserLoaded) {
            if (userRef.current) {
                getUserData(userRef.current.uid)
                    .then((res) => {
                        roleRef.current = res.role;
                        setIsRoleLoaded(true);
                    })
                    .catch(
                    // TODO set error message if role fails to load
                )
            } else {
                return <Navigate to="/login" />
            }
        } else {
            userRef.current = currentUser;
            setIsUserLoaded(true);
        }
    }
}