import React, { useEffect } from 'react'
import { useContext } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from '../auth/authContext';
import { startChecking } from '../helpers/startChecking';
import { LoginScreen } from '../Login/LoginScreen';

import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const{setChecking, setUser, checking}= useContext(AuthContext);
    useEffect(() => {
         startChecking(setChecking, setUser);
      }, [setChecking,setUser])
     
     
    if(checking){
        return <h5>Espere...</h5>
     }
    return (
        <BrowserRouter>
           
        <Routes>
        <Route path="/login" element={
            <PublicRoute >
                <LoginScreen/>
            </PublicRoute>
        }
        
        />

       
        
        {/* <Route path="/login" element={<LoginScreen/>} /> */}
        <Route path="/*" element= {
        <PrivateRoute>
            <DashboardRoutes />
        </PrivateRoute>
        }/>
        {/* <Route path = "/*" element= {<DashboardRoutes/>}/> */}
        </Routes>
        </BrowserRouter>
    )
}
