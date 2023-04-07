import React, { useEffect, useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserRole } from '../../services/usersService';
import { Forbidden } from '../Forbidden/Forbidden';

// TODO get currentUserRole
export const RequireAuth = ({ allowedRoles }) => {

    const user = useRef(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const role = useRef(null);
    const [isRoleLoaded, setIsRoleLoaded] = useState(false);

    if (user.current && role.current === allowedRoles) {
        return <Outlet />
    } else if (user.current && isRoleLoaded && (role.current !== allowedRoles)) {
        return <Forbidden />
    } else {
        if (isUserLoaded) {
            if (user.current) {
                getUserRole(user.current.uid)
                .then((res) => {
                    role.current = res.role;
                    setIsRoleLoaded(true);
                })
                .catch (
                    // set error if getting role fail
                )
            } else {
                return <Navigate to="login" />
            }
        } else {
            const { currentUser } = useAuth();
            user.current = currentUser;
            setIsUserLoaded(true);
        }
    }
}