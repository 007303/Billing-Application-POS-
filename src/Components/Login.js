import React,{useState} from 'react'
import validator from 'validator'
import {useDispatch} from 'react-redux'
import {startSendData,startUserData,startAdminData,startProductData} from '../Actions/billingAction'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
const Login=(props)=>{
    const {handleAuth}=props
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errors,setErrors]=useState({})
    const error={}
    const dispatch=useDispatch()
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const errorValidation=()=>{
        if(email.length===0){
            error.email="Email Cannot be Blank"
        } else if(!validator.isEmail(email)){
            error.email="Invaid Email Format"
        }
        if(password.length===0){
            error.password="Password cannot be Blank"
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        errorValidation()
        if(Object.keys(error).length===0){
            const data={
                email:email,
                password:password
            }
            console.log(data)
            dispatch(startSendData({data,handleAuth,startUserData,startAdminData,startProductData,props}))
        }else {
            setErrors(error)
        }
        
    }
    const responseFacebook = (response) => {
        console.log(response);
      }
      const responseGoogle = (response) => {
        console.log(response);
      }
    return(
        <div >
            <div>
            <div class="mt-5"> 
                <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-4 align-center">
            <form onSubmit={handleSubmit}>
                <div class="row justify-content-center">
                <div class="col-md-4 align-center">
                <div class="mt-5">
                <h2 style={{color:'black'}}>Log In</h2>
                </div>
                </div>
                </div>
                <div class="mt-3">
                <input type="text" value={email} onChange={handleEmail} placeholder="Email" class="form-control"/><br/>
                <input type="password" value={password} onChange={handlePassword} placeholder="Password" class="form-control"/><br/>
                {errors.password&&<span>{errors.password}</span>}
                </div>
                <div class="row justify-content-center">
                <div class="col-md-2 align-center">
                <input type="submit" value="Login" class="btn btn-primary"/>
                </div>
                <div class="col-md-2 align-center">
                <input type="button" value="Cancel" class="btn btn-outline-primary" onClick={()=>{props.history.push('/Home')}}/>
                
                </div>
                <div class= "mt-5" style={{marginLeft:"10rem"}}>
                <FacebookLogin
                appId="360003622187899"
                autoLoad={false}
                fields="name,email,picture"
                onClick={responseFacebook}
                callback={responseFacebook} />
                 
                </div>
                <div class= "mt-5" style={{marginLeft:"10rem",height:"3rem"}}>
                <GoogleLogin
                    clientId="212926501400-menm7alb03rkgnejqjeue67av4ji8ap4.apps.googleusercontent.com"
                    buttonText="Login with Google Accounts"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                </div>
                </div>
            </form>
            </div>   
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
export default Login