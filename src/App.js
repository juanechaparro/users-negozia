import { useState } from "react";
import { AuthContext } from "./auth/authContext";
import { AppRouter } from "./routes/AppRouter";


function App() {
  
const [user, setUser] = useState({});
const [checking, setChecking] = useState(true);
const [userEdit, setUserEdit] = useState({});
const [openEdit, setOpenEdit] = useState(false);

  return (
    <div>
      <AuthContext.Provider value={
                {
                    user,
                    setUser,
                    checking,
                    setChecking,
                    userEdit,
                    setUserEdit,
                    openEdit,
                    setOpenEdit
                }
            } >
     <AppRouter/>
     </AuthContext.Provider>
    </div>
  );
}

export default App;
