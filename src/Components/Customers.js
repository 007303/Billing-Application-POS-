import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import validator from 'validator'
import {startUserEntry,startUserData} from '../Actions/billingAction'
import CustomerList from './CustomerList'
const Customers=(props)=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [number,setNumber]=useState("")
    const [errors,setErrors]=useState({})
    const error={}
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startUserData())
    },[dispatch])
    const handleName=(e)=>{
        setName(e.target.value)
    }
    const handleNumber=(e)=>{
        setNumber(e.target.value)
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const errorValidation=()=>{
        if(name.length===0){
            error.name="Enter the Name"
        }
        if(email.length===0){
            error.email="Enter the Email"
        }else if(!validator.isEmail(email)){
            error.email="Invalid Email Format"
        }
        if(number.length===0){
            error.number="Enter the Phone Number"
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        errorValidation()
        if(Object.keys(error).length===0){
            const data={
                name:name,
                mobile:number,
                email:email
            }
            dispatch(startUserEntry({data,startUserData,setName,setEmail,setNumber,setErrors}))
            console.log(data)
        }else{
            setErrors(error)
        }
        
    }
    return(
        <div class="container">
            <form onSubmit={handleSubmit}>
                <h2>Customer Registration</h2>
                <div class="row" >
                <div class="col-md-3">
                <input type="text" value={name} onChange={handleName} placeholder="Name" class="form-control"/><br/>
                {errors.name&&<span>{errors.name}</span>}<br/>
                </div>
                <div class="col-md-3">
                <input type="number" value={number} onChange={handleNumber} placeholder="Phone Number" class="form-control"/><br/>
                {errors.number&&<span>{errors.number}</span>}<br/>
                </div>
                <div class="col-md-3">
                <input type="text" value={email} onChange={handleEmail} placeholder="Email" class="form-control"/><br/>
                {errors.email&&<span>{errors.email}</span>}<br/>
                </div>
                <div class="col-md-3" >
                <input type="submit" value="Save" class="btn btn-success"/>
                <input type="button" value="Cancel" class="btn btn-danger"/>
                </div>
                </div>
            </form>
            <CustomerList/>
        </div>
    )
}
export default Customers