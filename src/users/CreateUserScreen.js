import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';

export const CreateUserScreen = () => {
  const navigate = useNavigate();
  const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
      

  });
 const  {name, lastName, email,company, password, userType} = formRegisterValues;

 const handleRegister = async(e)=>{
  e.preventDefault();
  const resp = await fetchConToken('users', {name, lastName, email, company, password, userType}, 'POST');
        const body = await resp.json();
        if (body.ok){
            navigate("/admin_list_active_users");
        }else{
            Swal.fire('Error', body.msg, 'error');
        }      

 }
  return (
    <div className="container login-container">
       <div className="col-md-6 login-form-2 animate__animated animate__bounce">
                    <h3>Registra un nuevo usuario</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "name"
                                value ={name}
                                onChange= {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Apellido"
                                name = "lastName"
                                value ={lastName}
                                onChange= {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "email"
                                value ={email}
                                onChange= {handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Empresa" 
                                name = "company"
                                value ={company}
                                onChange= {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = "password"
                                value ={password}
                                onChange= {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                name = "userType"
                                value ={userType}
                                onChange= {handleRegisterInputChange}
                            >
                            <option disabled selected>Selecciona un tipo de usuario</option>
                            <option value="visitor">Visitante</option>
                            <option value="admin" > Administrador</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear usuario" />
                        </div>
                        
                    </form>
                </div>
            </div>
    
  
  )
}
