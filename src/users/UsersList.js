import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Space, Table}from 'antd'
import { useFetchUsers } from '../hooks/useFetchUsers'
import { fetchConToken } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/authContext';
import { EditUser } from './EditUser';

export const UsersList = () => {
  const [{loading, users},setState] = useFetchUsers();
  const { setOpenEdit, setUserEdit,user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = async(e,user)=>{
    
    e.preventDefault();  
    if(user?.userType === 'admin'){
    const resp = await fetchConToken(`users/${user.id}`, {}, 'DELETE');
    const body = await resp.json();
    if (body.ok){
        setState({users:users.filter(usr=> usr.id !== user.id),
        loading :loading})
        Swal.fire('Success', `usuario ${user.name} ${user.lastName} ${user.id} eliminado`, 'success'); 
    }else{
        Swal.fire('Error', body.msg, 'error');
    } }
}
const handleEdit=(e, user)=>{
  if(user?.userType === 'admin'){
  setUserEdit(user)
  e.preventDefault();
  setOpenEdit(true);
  }
}
 const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name', 
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',        
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
        title: 'Eliminar usuario',
        key: 'action',
        render: (text, usr) => (
          <Space size="middle">
              <button onClick={(e)=>handleDelete(e, usr)} className={user?.userType === "admin" ? 'btn btn-outline btn-danger' : 'btn-light btn btn-outline'}>
                Eliminar ⛔</button>
          </Space>
        ),
      },
    {
        title: 'Editar usuario',
        key: 'action',
        render: (text, usr) => (
          <Space size="middle">
              <button onClick={(e)=>handleEdit(e, usr)} className={user?.userType  === "admin" ? 'btn btn-outline btn-primary' : 'btn-light btn btn-outline'}>
                Editar</button>
          </Space>
        ),
      }
]
  return (
    <>
    <div className='top_container'>
    <EditUser/>
    <h3 className = 'animate__animated animate__fadeIn top_title'>Lista de usuarios:
    {
      user.userType === "admin" &&
      <button onClick={(e)=>{navigate("/create_user")}} className='btn btn-primary mt-20'> Añadir Usuario</button>
    }
    </h3>
    </div> 
    {loading && <p className ='animate__animated animate__flash'>'Cargando...'</p> }   
      <div >
            <Table 
           loading={loading}
           columns={columns}
           dataSource={users}
           rowKey={user => user.id} 
        />
         
       </div>
           
     </>
  )
}
