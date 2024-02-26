import {useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

export default function AdminRoute()
{
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>
    {
        const authCheck=async ()=>
        {
            const res=await fetch("http://localhost:8000/api/auth/admin-auth",{
                headers:{
                    "Authorization":auth?.token,
                }
            });
            if(res.ok)
            {
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token])
    return ok?<Outlet/>:<Spinner/>;
}

