import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';
import Modal from 'react-modal';
import './users.css';
import { AuthContext } from '../auth/authContext';
const customStyles = {
    
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '500px'

    }
  }
export const EditUser = () => {
   Modal.setAppElement('#root')
  const { setOpenEdit, userEdit, openEdit } = useContext(AuthContext);
//   const [modalIsOpen, setIsOpen] = React.useState(true)
  const onCloseModal = () => {
    setOpenEdit(false)
  }
  const initialValues = {
    name: userEdit.name,
    lastName: userEdit.lastName,
    email: userEdit.email,
    company: userEdit.company,
    userType:userEdit.userType
}
  
  const navigate = useNavigate();
  const [ formEditValues, handleEditInputChange ] = useForm(initialValues);
 const  {name, lastName, email,company, userType} = formEditValues;

 const handelEditUser = async(e)=>{
  e.preventDefault();
  const resp = await fetchConToken('users', {name, lastName, email, company, userType,uid: userEdit.id}, 'PUT');
        const body = await resp.json();
        if (body.ok){
            navigate("/admin_list_active_users");

        }else{
            Swal.fire('Error', body.msg, 'error');
        }      

 }
  return (
    
    <Modal
    isOpen={openEdit}
    onRequestClose={onCloseModal}
    style={customStyles}
    className="modal"
>
    <div className="container">
        {console.log(userEdit) }
       <div className="edit-form animate__animated animate__bounce">
                    <h3>Edita el usuario {userEdit.name} {userEdit.lastName} <div onClick={onCloseModal} className="modal_close">
                    x </div></h3>
                    <form onSubmit={handelEditUser}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "name"
                                value ={name}
                                onChange= {handleEditInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Apellido"
                                name = "lastName"
                                value ={lastName}
                                onChange= {handleEditInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "email"
                                value ={email}
                                onChange= {handleEditInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Empresa" 
                                name = "company"
                                value ={company}
                                onChange= {handleEditInputChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <select
                                className="form-control"
                                name = "userType"
                                value ={userType}
                                onChange= {handleEditInputChange}
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
                                value="Editar usuario" />
                        </div>
                        
                    </form>
                </div>
            </div>
            </Modal>
            
    
  )
}
