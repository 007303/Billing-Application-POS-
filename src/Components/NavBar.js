import React from 'react'
import {Link,Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import DashBoard from './DashBoard'
import Customers from './Customers'
import Products from './Products'
import Profile from './Profile'
import Billing from './Billing'
import {withRouter} from 'react-router'
const NavBar=(props)=>{
    const {handleAuth,isLoggedIn}=props
    const handleLogout=()=>{
        localStorage.clear()
        handleAuth()
        props.history.push('./Home')
    }
    return(
        <div>
            {isLoggedIn?
            (
            <div>
                <div >
                <nav class="navbar navbar-light" style={{backgroundColor: "#62B1F6"}}>
                <Link to="/Dashboard" class="text-decoration-none"  style={{color:'white'}}>DashBoard</Link>
               <Link to="/Customers" class="text-decoration-none"  style={{color:'white'}}>Customers</Link>
                <Link to="/Products" class="text-decoration-none"  style={{color:'white'}}>Products</Link>
                <Link to="/Billing" class="text-decoration-none"  style={{color:'white'}}>Billing</Link>
                <Link to="/Profile" class="text-decoration-none"  style={{color:'white'}}>Profile</Link>
                <Link onClick={handleLogout} class="text-decoration-none"  style={{color:'white'}}>Logout</Link>
                </nav>
                <Route path="/Dashboard" component={DashBoard}/>
                <Route path="/Customers" component={Customers}/>
                <Route path="/Products" component={Products}/>
                <Route path="/Billing" component={Billing}/>
                <Route path="/Profile" component={Profile}/>
            </div>
            </div>
            ):(
            
            <div>
                <nav class="navbar navbar-light" style={{backgroundColor: "#62B1F6"}}>
                <Link to="/Home" class="text-decoration-none" style={{color:'white'}}>Home</Link>
                <Link to="/Login" class="text-decoration-none"  style={{color:'white'}}>Login</Link>
                <Link to="/Register" class="text-decoration-none"  style={{color:'white'}}>Register</Link>
                </nav>
                <Route path="/Home" component={Home}/>
                <Route path="/Login" render={(props)=>{
                    return(
                    <Login {...props}
                    handleAuth={handleAuth}/>
                    )
                }}/>
                <Route path="/Register" component={Register}/>
            </div>
            )}
            
        </div>
    )
}
export default withRouter(NavBar)