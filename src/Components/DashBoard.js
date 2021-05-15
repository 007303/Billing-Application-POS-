import React, { useEffect ,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {startUserData,startProductData, startBillData} from '../Actions/billingAction'
import Chart from "react-google-charts"
const DashBoard=(props)=>{
    const [user,setUser]=useState([])
    const [products,setProducts]=useState([])
    const dispatch=useDispatch()
    let income=0
    useEffect(()=>{
        dispatch(startUserData())
        dispatch(startProductData())
        dispatch(startBillData())
    },[])
    const dat=useSelector((state)=>{
        return (state.users)
    })
    const prod=useSelector((state)=>{
        return (state.products)
    })
    console.log(dat)
    const bills=useSelector((state)=>{
        console.log(state)
        return state.allBills
    })
    console.log(bills)
   const result=dat.slice(-5)
   const product=prod.slice(-5)
   console.log(result)
   const use=dat.length
    console.log(use)
    bills.map((ele)=>{
         return(income=income+ele.total)
    })
    console.log(prod)
    const data = [
        ["Element", "", { role: "style" }],
        ["Customers", dat.length, "#0096FF"], 
        ["Products", prod.length, "#0096FF"], 
        ["Bills", bills.length, "#0096FF"],
        ["Average Business Income",`${income}`, "color: #0096FF"] 
      ];
    return(
        <div class="container">
             <div className="card-deck" style={{width: '100rem'}}>
            <div class="row">
                <i><h3>Recent Customers</h3></i>
            {result.map((ele)=>{
               return( 
               <div class="col-sm-2">
                <div class="card-deck mt-2">
                <div  class="card">
                <div class="card-body">
                <i><h3 class="card-title">{ele.name}</h3></i>
                <div class="card-subtitle mb-2 text-muted">
                <i><p class="card-text">Mobile Number:{ele.mobile}</p></i>
                <i><p class="card-text">Gmail Id:{ele.email}</p></i>
                </div>
                </div>
                </div>
                </div>
                </div>)
            })}
            </div>
            <div class="mt-3">
            <div class="card-deck" style={{width:"100rem"}}>
                <div class="row">
                <i><h3>Recently Added Items</h3></i>
            {product.map((ele)=>{
                return(
                    <div class="col-sm-2">
                        <div class=" card-deck mt-4">
                        <div  class="card">
                            <div class="card-body">
                            <i><h3 class="card-title">{ele.name}</h3></i>
                            <div class="card-subtitle mb-2 text-muted">
                            <i><p class="card-text">Price:{ele.price}</p></i>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                       
                )
            })}
                 
                </div>
            </div>
            </div>
            <Chart
          chartType="ColumnChart"
          width="90%"
          height="350px"
          data={data}
        />
        </div>
        </div>
    )
}
export default DashBoard