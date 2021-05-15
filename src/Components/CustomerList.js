import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteCustomer} from '../Actions/billingAction'
import {Button,Modal} from 'react-bootstrap'
import {updatedCustomer} from '../Actions/billingAction'
import 'bootstrap/dist/css/bootstrap.min.css'

const CustomerList=(props)=>{
    const [users,setUsers]=useState([])
    const [search,setSearch]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [number,setNumber]=useState("")
    const [show,setShow]=useState(false)
    const [id,setId]=useState([])
    const dispatch=useDispatch()
    const user=useSelector((state)=>{
        return state.users
    })
    useEffect(()=>{
        setUsers(user)
    },[user])
    console.log(users)
    const handleDelete=(id)=>{
        console.log(id)
        dispatch(deleteCustomer(id))
    }
    const handleName=(e)=>{
        setName(e.target.value)
        console.log(e.target.value)
    }
    const handleNumber=(e)=>{
        setNumber(e.target.value)
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleShow=()=>{
        setShow(!show)
    }
    console.log(show)
    const handleButton=(ele)=>{
        setName(ele.name)
        setNumber(ele.mobile)
        setEmail(ele.email)
        handleShow()
        setId(ele._id)
    }
    const handleSave=()=>{
        const changes={
            name:name,
            mobile:number,
            email:email
        }
        console.log(changes)
        dispatch(updatedCustomer({changes,id}))
        handleShow()
    }
    const handleSearch=(e)=>{
        setSearch(e.target.value)
        const data=users.filter((ele)=>{
            return(ele.name.toLowerCase().includes(e.target.value.toLowerCase()))
        })
        setUsers(data)
        if(e.target.value==""){
            setUsers(user)
        }
        console.log(search)
    }
    console.log(users)
    
    return(
        <div>
        <div class="row">
        <div class="col-md-10">
        <h2>Customers</h2>
        </div>
        <div class="col-md-4    " >
        <input type="text" value={search} onChange={handleSearch} placeholder="Search" className="form-control"/>
        </div>
        </div>
        <div className="card-deck" style={{width: '75rem'}}>
        <div class="row">
        {users.map((ele)=>{
           return( 
            <div class="col-sm-3">
            <div class="card-deck mt-4">
            <div  class="card">
            <div class="card-body">
            <i><h3 class="card-title">{ele.name}</h3></i>
            <div class="card-subtitle mb-2 text-muted">
            <i><p class="card-text">Mobile Number:{ele.mobile}</p></i>
            <i><p class="card-text">Gmail Id:{ele.email}</p></i>
            </div>
            <div class="row">
            <div class="row justify-content-center">
            <div class="col-md-8 align-content">
            <i><button onClick={()=>{handleButton(ele)}} class="btn btn-primary">Edit</button></i>
            <i><button onClick={()=>{handleDelete(ele._id)}} class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
            </svg></button> </i>
            
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            )
        })}
        </div>
        </div>
            <Modal show={show}>
            <Modal.Header>Edit Customer</Modal.Header>
            <Modal.Body>
               <form>
                   <div class="row">
                       <div class="col-md-4">
                        <label>Customer</label>
                       <input type="text" value={name} onChange={handleName} className="form-control"/>
                       </div>
                       <div class="col-md-4">
                       <label>Contact Number</label>
                       <input type="number" value={number} onChange={handleNumber} className="form-control"/>
                       </div>
                       <div class="col-md-4">
                        <label>Email Id</label>
                       <input type="text" value={email} onChange={handleEmail} className="form-control"/>
                       </div>
                   </div>
               </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Save Changes</Button>
                <Button onClick={handleButton}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}
export default CustomerList