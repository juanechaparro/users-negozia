import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/authContext';
import { fetchSinToken } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const { setUser} = useContext(AuthContext);
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        email: "juanechaparro@hotmail.com",
        password:'negozia'

    } );
    const {email, password} = formLoginValues;
    const  handleLogin= async (e)=>{
        e.preventDefault();
        const resp = await fetchSinToken('users/login', {email,password}, 'POST');
        const body = await resp.json();
        if (body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            setUser({
                uid:body.uid,
                userType:body.userType
            })
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
        
    }
    
      
  return (
    <div className="container login-container">
         <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name= "email"
                                value ={email}
                                onChange = {handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "password"
                                value ={password}
                                onChange = {handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                </div>

    </div>
  )
}
