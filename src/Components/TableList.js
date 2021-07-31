import React ,{useState}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteBill} from '../Actions/billingAction'
import Modal from "react-bootstrap/Modal"
const TableList=(props)=>{
    const [billInfo,setBillInfo]=useState()
    const [display,setDisplay]=useState()
    let nam=""
    const {toggle}=props
    let cust=[]
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
    const handleCustomer=(e)=>{
        setBillInfo(e)
        toggling()
    }
    console.log(billInfo)
    const toggling=()=>{
        setDisplay(!display)
    }
    {billInfo&&(
        cust=users.filter((ele)=>{
            return(ele._id==billInfo.customer)
        })
    ) 
    }
    {billInfo&&(
    cust.map((ele)=>{
         nam=(ele.name)
    }))}
    console.log(nam)
    return(
        <div class="container">
            {toggle?(
                <form >
                <h1>Invoice</h1>
                <div class="row">
                <div class="col-md-9">
                <h5>Date:{bill.date&&bill.date.slice(0,10).split().reverse().join()}</h5>
                </div>
                <div class="col-md">
                <h3>Name:{filteredUser.map((ele)=>{
                    return(ele.name)
                })}</h3>
                </div>
                </div>
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
                                    <td onClick={()=>{handleCustomer(ele,i)}} ><button class="btn btn-primary">Show</button></td>
                                    <td><button onClick={()=>{handleDelete(ele._id)}} class="btn btn-outline-primary">Delete</button></td>
                                </tr>
                            )
                        })}
                       
                    </tbody>
                </table>

            <Modal show={display}>
            <Modal.Header>
              <Modal.Title><h3>Customer Bill Info</h3></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div>
                    <form>
                    <div class="row">
                        <div>
                        <h6>{billInfo&& `Bill Date:${billInfo.date.slice(0,10)}`}</h6>
                        <h6>Customer:{nam}</h6>
                        </div>
                        
                    </div>
                 <table class="table">
                     <thead>
                     <tr>
                         <th>id</th>
                         <th>No of items Bought</th>
                         <th>BillAmount</th>

                     </tr>
                     </thead>
                     <tbody>
                         {billInfo&&(
                             <tr>
                             <td>1</td>
                             <td>{billInfo.lineItems.length}</td>
                             <td>{billInfo.total}</td>
                         </tr> 
                         )}
                            
                     </tbody>
                 </table>
                 </form>
                 </div>
              </Modal.Body>
              <Modal.Footer>
                  <button class="btn btn-outline-primary" onClick={()=>{toggling()}}>Cancel</button>
              </Modal.Footer>
          </Modal>
                </div>
            )}
            
        </div>
    )
}
export default TableList