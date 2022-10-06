import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../auth/authContext'

export const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    return user.uid ? <Navigate to = "/admin_list_active_users"/> : children
}
