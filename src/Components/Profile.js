import React, { useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {startAdminData} from '../Actions/billingAction'
const Profile=(props)=>{
    const dispatch=useDispatch()
    const [profile,setProfile]=useState()
    useEffect(()=>{
        dispatch(startAdminData())
    },[])
    const user=useSelector((state)=>{
        return (state.admin)
    })
    console.log(user)
return(
    <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-3 align-center">
        <div class="mt-5">
        <div class="card w-90" style={{width: '16rem'}}>
        <div class="card-body">
        <i class="card-title"><h4>Admin:{user.username}</h4> </i>
        <i><h6 class="card-subtitle mb-2 text-muted">Email:{user.email}</h6></i>
        <i><p class="card-subtitle mb-2 text-muted">Business:{user.businessName}</p></i>
        <i><p  class="card-subtitle mb-2 text-muted">Address:{user.address}</p></i>
        </div>
        </div>
       </div>
       </div>
       </div>
    </div>
)
}
export default Profile