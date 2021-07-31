import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {startGetData} from '../Actions/billingAction'
import validator from 'validator'
const Register=(props)=>{
    console.log(props.location.search)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [business,setBusiness]=useState("")
    const [address,setAddress]=useState("")
    const [errors,setErrors]=useState({})
    const error={}
    const dispatch=useDispatch()
    const handleName=(e)=>{
        setName(e.target.value)
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handlebusiness=(e)=>{
        setBusiness(e.target.value)
    }
    const handleAddress=(e)=>{
        setAddress(e.target.value)
    }
    const errorValidation=()=>{
        if(name.length===0){
            error.name="Name field cannot be Blank"
        }
        if(email.length===0){
            error.email="Email feild cannot be Blank "
        }else if(!validator.isEmail(email)){
            error.email="Invalid Email format"
        }
        if(password.length===0){
            error.password="Password feild Cannot be Blank"
        }
        if(business.length===0){
            error.business="Business feild cannnot be Blank"
        }
        if(address.length===0){
            error.address="Address feild cannot be Blank"
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        errorValidation()
        if(Object.keys(error).length===0){
            const data={
                username:name,
                email:email,
                password:password,
                businessName:business,
                address:address
            }
            console.log(data)
            dispatch(startGetData({data,props}))
            setName("")
            setEmail("")
            setPassword("")
            setBusiness("")
            setAddress("")
        }else{
            setErrors(error)
        }
    }
    return(
        <div style={{backgroundImage: `url("https://image.shutterstock.com/z/stock-vector-online-shopping-internet-market-mobile-app-shopping-and-people-buy-gifts-smartphone-payment-and-1541828396.jpg")`}}>
        <div class="mt-5">
        <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-4 align-center">
           <form onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                <div class="col-md-4 align-center">
               <h2>Register</h2>
               </div>
               </div>
               <input type="text" value={name} onChange={handleName} placeholder="Name" class="form-control"/><br/>
               {errors.name&&<span>{errors.name}</span>}
               <input type="text" value={email} onChange={handleEmail} placeholder="Email" class="form-control"/><br/>
               {errors.email&&<span>{errors.email}</span>}
               <input type="password" value={password} onChange={handlePassword} placeholder="Password" class="form-control"/><br/>
               {errors.password&&<span>{errors.password}</span>}
               <input type="text" value={business} onChange={handlebusiness} placeholder="Business Name" class="form-control"/><br/>
               {errors.business&&<span>{errors.business}</span>}
               <input type="text" value={address} onChange={handleAddress} placeholder="Address" class="form-control"/><br/>
               {errors.address&&<span>{errors.address}</span>}
               <div class="row justify-content-center">
               <div class="col-md-3 align-center">
               <input type="submit" value="Register" class="btn btn-primary"/>
               </div>
               <div class="col-md-3 align-center">
               <input type="button" value="Cancel" class="btn btn-outline-primary" onClick={()=>{props.history.push('/Home')}}/><br/>
               </div>
               </div>
               <div class="row justify-content-center">
               <div class="col-md-6 align-center">
               <p>Already Registered <Link to="/Login">Login</Link></p>
               </div>
               </div>
               
           </form>
           </div>
           </div>
        </div>
        </div>
        </div>
    )
}
export default Register