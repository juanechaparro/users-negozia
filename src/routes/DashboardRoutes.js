
import { Routes, Route } from "react-router-dom";
import { UsersList } from "../users/UsersList";
import { CreateUserScreen } from "../users/CreateUserScreen";
import { NavBar } from "../ui/NavBar";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
export const DashboardRoutes = () => {
  const {user} = useContext(AuthContext);
    return (
        <>
          <NavBar/>   
          
         <div className = "container">
          
           <Routes>
      
        <Route path="admin_list_active_users" element={<UsersList/>} />
        {user.userType === "admin" &&
         <Route path="create_user" element={<CreateUserScreen/>} />
        }
       
        </Routes>
        </div>
        </>
    )
}
