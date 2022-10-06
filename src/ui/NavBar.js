import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

export const NavBar = () => {
  
    const {user,setChecking, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
       
              localStorage.clear();
              setChecking(false);
              setUser({});
              navigate('/login', {
                replace:true
            });
        
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
        

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        
                        className={({isActive})=> "nav-item nav-link ml-20 " + (isActive && 'active') }
                        to="/admin_list_active_users"
                    >
                        Lista de usuarios
                    </NavLink>
                    {user.userType === "admin" &&
                    <NavLink 
                        className={({isActive})=> "nav-item nav-link " + (isActive && 'active') }
                        to="/create_user"
                    >
                        Crear usuario
                    </NavLink>
                  }
                    
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className = "nav-item nav-link text-info" >
                       {user.userType}{user.email}

                    </span>
                    <button 
                        className="nav-item nav-link btn" 
                        onClick = {handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
  
}
