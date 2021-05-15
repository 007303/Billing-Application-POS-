import React,{useEffect, useState} from 'react'
import NavBar from './Components/NavBar'
const App=(props)=>{
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const handleAuth=()=>{
    setIsLoggedIn(!isLoggedIn)
  }
  useEffect(()=>{
    if(localStorage.length===1){
      handleAuth()
    }
  },[])
  return(
    <div>
      <NavBar handleAuth={handleAuth} isLoggedIn={isLoggedIn}/>
    </div>
  )
}
export default App