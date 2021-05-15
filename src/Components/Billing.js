import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {startUserData,startProductData,billing,startBillData} from '../Actions/billingAction'
import "react-datepicker/dist/react-datepicker.css"
import TableList from './TableList'
import DatePicker from 'react-datepicker'
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const Billing=(props)=>{
    const [customer,setCustomer]=useState([])
    const [products,setProducts]=useState([])
    const [user,setUser]=useState({})
    const [items,setItems]=useState("")
    const [quantity,setQuantity]=useState(0)
    const [addItem,setAddItem]=useState([{product:"",quantity:""}])
    const [toggle,setToggle]=useState(false)
    const [date,setDate]=useState(new Date())
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startUserData())
        dispatch(startProductData())
        dispatch(startBillData())
    },[dispatch])
    const users=useSelector((state)=>{
        return state.users
    })
    const prod=useSelector((state)=>{
        return state.products
    })
    useEffect(()=>{
        setCustomer(users)
    },[users])
    useEffect(()=>{
        setProducts(prod)
    },[prod])
    console.log(customer)
    console.log(items)
    const handleCustomer=(e)=>{
        setUser(e.value)
    }
    const handleItem=(e,i)=>{
        setItems(e.target.value)
        const values=[...addItem]
        values [i][e.target.name]=e.target.value
        setAddItem(values)
        
    }
    const handleQuantity=(e,i)=>{
        e.preventDefault()
        setQuantity(e.target.value)
        const values=[...addItem]
        values [i][e.target.name]=e.target.value
        setAddItem(values)
        if(e.target.value<0){
            setQuantity(0)
        }  
    }    
    const handleAddItem=(e)=>{
        e.preventDefault()
        setAddItem([...addItem,{product:"",quantity:""}])
    }
    console.log(addItem)
    const generateBill=(e)=>{
        e.preventDefault()
        const data={
            date:date,
            customer:user,
            lineItems:addItem
        }
        dispatch(billing({data,handleToggle}))
        console.log(data)
        console.log(addItem)
        setAddItem([{product:"",quantity:""}])
        setQuantity("")
        setItems("")

    }
    const handleRemove=(e,i)=>{
        e.preventDefault()
        const values=[...addItem]
       values.splice(i,1)
       console.log(values)
       console.log(setAddItem(values))

        
    }
    
    const handleToggle=()=>{
        setToggle(!toggle)
    }
    const options = users.map((ele)=>{
            return({label: ele.name, value: ele._id})
        })
    
    console.log(options)
    const option=prod.map((ele)=>{
        return({label:ele.name,value:ele._id})
    })
    return(
        <div class="container">
            <form>
            <i><h2>Generate Bill</h2></i>
            <div class="row">
            <div class="col-md-8">
            <DatePicker  selected={date} class="form-control" onChange={(date) => {
                 console.log(date)
                return(
                setDate(date)
           )}} />

           </div>
           <div class="col-md-3">
            <div class="row">
            <Select 
            options={options}
            placeholder="select Customer"
            theme={makeAnimated}
            onChange={(e)=>{handleCustomer(e)}}
            isSearchable/>
            </div>
            </div>
            <div class="mt-4">
            {addItem.map((ele,i)=>{
                console.log(ele)
                return(<div class="row">
                    <div class="col-md-4">
                    <div >
                    <div class="row">
                    <select onChange={(e)=>{handleItem(e,i)}} value={ele.product} name="product" class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
                        <option value="select user" class="custom-select">select Product</option>
                        {prod.map((ele)=>{
                            return(<option value={ele._id}>{ele.name}</option>)
                        })}
                    </select>
                    {/* <Select 
                    value="product"
                    options={option}
                    placeholder="select Product"
                    theme={makeAnimated}
                    onChange={(e)=>{handleItem(e,i)}}
                    isSearchable/> */}
                    </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div >
                    <div class="row">
                    <input type="number" value={ele.quantity} name="quantity"placeholder="Quantity" onChange={(e)=>{handleQuantity(e,i)}} class="form-control" />
                    </div >
                    
                    </div>
                    </div>
                    <div class="col-md-2">
                    <div>
                    <button onClick={(e)=>{handleRemove(e,i)}} class="btn btn-outline-primary">Remove Item</button>
                 </div> 
                 </div>
                 </div> 
                 )
            })}
            </div> 
            <div class="row">
            <div class="col-md-5">
            <button onClick={handleAddItem} class="btn btn-outline-primary">Add More Items</button><br/>
            </div>
            <div class="col-md-5">
            <button onClick={generateBill} class="btn btn-primary">Generate Bill</button>
            </div>
            </div>
            </div>
           
            </form><hr/>
            
                
            <TableList toggle={toggle}/>
        </div>
    )
}
export default Billing