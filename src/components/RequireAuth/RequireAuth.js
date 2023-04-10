import React, { useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserRole } from '../../services/usersService';

export const RequireAuth = ({ allowedRoles }) => {

    const userRef = useRef(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const roleRef = useRef(null);
    const [isRoleLoaded, setIsRoleLoaded] = useState(false);


    if (userRef.current && roleRef.current === allowedRoles){
        return <Outlet />
    } else if (userRef.current && isRoleLoaded && roleRef.current !== allowedRoles){
        return <Navigate to="/forbidden" />
    } else {
        if(isUserLoaded){
            if(userRef.current){
                getUserRole(userRef.current.uid)
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
            const {currentUser} = useAuth();
            userRef.current = currentUser;
            setIsUserLoaded(true);
        }
    }
}