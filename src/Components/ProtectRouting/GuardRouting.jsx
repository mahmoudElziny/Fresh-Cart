import React from 'react'
import Home from '../Home/Home'
import { Navigate } from 'react-router-dom'

export default function GuardRouting({children}) {
  

    if(localStorage.getItem('userToken') != null){
        return children;       
    }else {
        return <>
            <Navigate to="Fresh-Cart/login" />
        </>
    }
}
