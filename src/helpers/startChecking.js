

import { fetchConToken } from './fetch';

export const startChecking = async(setChecking, setUser) => {
    
    const resp = await fetchConToken('users/renew');
    const body = await resp.json();
    console.log(body)
    if (body.ok){
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        setChecking(false);
        setUser({
            uid:body.uid,
            email:body.email,
            userType:body.userType
        });
      
    }else{
       console.log('Error', body.msg, 'error') ;
        setChecking(false);
    } 
}
