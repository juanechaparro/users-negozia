import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'


export const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    return user.uid ? children : <Navigate to = "/login"/>
}
