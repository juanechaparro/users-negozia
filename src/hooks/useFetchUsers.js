import { useEffect, useState } from "react";
import { fetchConToken } from "../helpers/fetch";

export const useFetchUsers = ()=>{
    const [state, setState] = useState({
        users :[],
        loading:true
    });
    
    const getUsers = async()=> {
        try{
            const resp = await fetchConToken("users");
            const {users}= await resp.json();
            return users;
        }catch(error){
            console.log(error);
        }
    }
      
    useEffect(() => {
      getUsers().then(usrs=>{
          setState({
              users:usrs,
              loading:false
          })
      })
    
     
    }, [])
    return  [state, setState];
}

