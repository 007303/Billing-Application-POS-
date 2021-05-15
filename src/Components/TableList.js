import React ,{useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteBill} from '../Actions/billingAction'
const TableList=(props)=>{
    const {toggle}=props
    const dispatch=useDispatch()
    const bill=useSelector((state)=>{
        return state.bill
    })
    console.log(bill)
    const users=useSelector((state)=>{
        return state.users
    })
    const products=useSelector((state)=>{
        return state.products
    })
    const bills=useSelector((state)=>{
        console.log(state)
        return state.allBills
    })
    const filteredUser=users.filter((ele)=>{
        return(ele._id==bill.customer)
    })
    const handleDelete=(data)=>{
        console.log(data)
        dispatch(deleteBill(data))
    }
    console.log(filteredUser)
    console.log(products)
    console.log(bills)
    console.log(users)
    console.log(bill.lineItems)
    const filteredProduct=Object.keys(bill).length!==0&&bill.lineItems.map((ele)=>{
        return(products.filter((e)=>{
            return(e._id==ele.product)
        }))
    })
    console.log(filteredProduct)
    const filterBills=bills.map((ele)=>{
        return(users.filter((e)=>{
            return(ele.customer==e._id)
        }))
    })
    console.log(filterBills)
    const all=[...filterBills,...bills]
    console.log(all)
    return(
        <div class="container">
            {toggle?(
                <form >
                <h1>Invoice</h1>
                <h5>Date:{bill.date&&bill.date.slice(0,10).split().reverse().join()}</h5>
                <h5>Name:{filteredUser.map((ele)=>{
                    return(ele.name)
                })}</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Products</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProduct.length!==0&&filteredProduct.map((ele,i)=>{
                           return( ele.map((ele)=>{
                               return(<tr>
                                  
                                <td>{i}</td>
                                <td>{ele.name}</td>
                                <td>{ele.price}</td>
                            </tr>)
                           })  )
                        })}
                    </tbody>
                </table>
                <td></td>
                <h3>SubTotal-{bill.total}</h3>
                </form>
                
            ):(<h2></h2>)}<hr/>
            {bills.length==0?(
            <div class="row justify-content-center">
                <div class="col-md-2 align-content">
                <i><h3>No Data</h3></i>
                </div>
                </div>

            ):(
                <div>
                <h2>Bills</h2>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Customer</th>
                        <th scope="col">BillAmount</th>
                        <th ></th>
                    </tr>
                    </thead>
                    <tbody>
                        {bills.map((ele,i)=>{
                            return(
                                <tr>
                                    <td scope="row">{i}</td>
                                    <td>{ele.date.slice(0,10)}</td>
                                   <td>{ele.customer}</td>
                                    <td>{ele.total}</td>
                                    <td><button onClick={()=>{handleDelete(ele._id)}} class="btn btn-outline-primary">Delete</button></td>
                                </tr>
                            )
                        })}
                       
                    </tbody>
                </table>
                </div>
            )}
            
        </div>
    )
}
export default TableList