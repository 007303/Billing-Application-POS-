import React,{useEffect, useState} from 'react'
import {productEntry,startProductData} from '../Actions/billingAction'
import {useDispatch} from 'react-redux'
import ProductList from './ProductList'
const Products=(props)=>{
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startProductData())
    },[])
    
    const handleName=(e)=>{
        setName(e.target.value)
    }
    const handlePrice=(e)=>{
        setPrice(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data={
            name:name,
            price:price
        }
        dispatch(productEntry(data))
        setName("")
        setPrice("")
    }
    return(
        <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-19 align-center">
            <form onSubmit={handleSubmit}>
                <h2>Add Products</h2>
                <div class="row">
                <div class="col-md-5">
                <input type="text" value={name} onChange={handleName} placeholder="Product Name" class="form-control"/><br/>
                </div>
                <div class="col-md-4">
                <input type="number" value={price} onChange={handlePrice} placeholder="Price" class="form-control"/><br/>
                </div>
                <div class="col-md-2">
                <input type="submit" value="Save" class="btn btn-primary"/>
                <input type="button" value="Cancel" class="btn btn-outline-primary"/>
                </div>
                </div>
            </form>
            <ProductList/>            
        </div>
        </div>
        </div>
    )
}
export default Products