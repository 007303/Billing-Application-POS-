import axios from 'axios'
export const startGetData=(data)=>{
    return(dispatch)=>{
        axios.post("http://dct-billing-app.herokuapp.com/api/users/register",data.data)
             .then((response)=>{
                 const result=response.data
                 if(result.hasOwnProperty('error')){
                     alert(result.errors.message)
                 }else{
                     alert("You have Successfully Registered")
                     data.props.history.push("/Login")
                 }
                 console.log(response.data)
             })
             .catch((error)=>{
                 console.log(error.message)
             })
    }
}
export const startSendData=(data)=>{
    return(dispatch)=>{
        axios.post("http://dct-billing-app.herokuapp.com/api/users/login",data.data)
             .then((response)=>{
                 const result=response.data
                 if(result.hasOwnProperty('errors')){
                     alert(result.errors)
                 }else{
                    localStorage.setItem('token',result.token )
                    console.log(response.data)
                    data.handleAuth()
                    data.startUserData()
                    data.startProductData()
                    data.startAdminData()
                    alert("Successfully Logged In")
                    data.props.history.push("/Dashboard")
                 }
                 
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const startUserData=()=>{
    return(dispatch)=>{
        axios.get("http://dct-billing-app.herokuapp.com/api/customers",{
        headers:{
            'Authorization' :`Bearer ${localStorage.getItem('token')}` 
        }
    })
         .then((response)=>{
             dispatch(userData(response.data))
         })
         .catch((error)=>{
             alert(error.message)
         })
    }
    
}
export const userData=(data)=>{
    return({
        type:"USERS_DATA",
        payload:data
    })
}
export const startProductData=()=>{
    return(dispatch)=>{
        axios.get("http://dct-billing-app.herokuapp.com/api/products",{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 dispatch(productData(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const productData=(pdata)=>{
    return({
        type:"PRODUCT_DATA",
        payload:pdata
    })
}
export const startUserEntry=(data)=>{
    return(dispatch)=>{
        axios.post("http://dct-billing-app.herokuapp.com/api/customers",data.data,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 if(response.data.hasOwnProperty('errors')){
                     alert(response.data.errors.mobile.message)
                 }else{
                    const result=response.data
                    dispatch(custEntry(result))
                    data.setName("")
                    data.setEmail("")
                    data.setNumber("")
                    data.setErrors({})
                 }
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const custEntry=(data)=>{
    return({
        type:"CUSTOMER_ENTRY",
        payload:data
    })
}
export const productEntry=(data)=>{
    return(dispatch)=>{
        axios.post("http://dct-billing-app.herokuapp.com/api/products",data,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(prodEntry(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const prodEntry=(data)=>{
    return({
        type:"PRODUCT_ENTRY",
        payload:data
    })
}

export const startAdminData=()=>{
    return(dispatch)=>{
        axios.get(" http://dct-billing-app.herokuapp.com/api/users/account",{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(adminData(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const adminData=(data)=>{
    console.log(data)
    return({
        type:"ADMIN_DATA",
        payload:data
    })
}
export const deleteCustomer=(id)=>{
    console.log(id)
    return(dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                'Authorization'  : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(deleteCust(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const deleteCust=(data)=>{
    return({
        type:"DELETE_CUSTOMER",
        payload:data
    })
}
export const deleteProduct=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(prodDelete(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const prodDelete=(data)=>{
    return({
        type:"DELETE_PRODUCT",
        payload:data
    })
}
export const updatedCustomer=(data)=>{
    return(dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${data.id}`,data.changes,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
              .then((response)=>{
                  console.log(response.data)
                  dispatch(updatedCust(response.data))
              })
              .catch((error)=>{
                  alert(error.message)
              })
    }
}
export const updatedCust=(data)=>{
    return({
        type:"UPDATED_CUSTOMER",
        payload:data
    })
}
export const updateProduct=(data)=>{
    return(dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${data.id}`,data.data,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(updatedProd(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const updatedProd=(data)=>{
    return({
        type:"UPDATED_PRODUCT",
        payload:data
    })
}
export const billing=(data)=>{
    return(dispatch)=>{
        axios.post("http://dct-billing-app.herokuapp.com/api/bills",data.data,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }) 
             .then((response)=>{
                 if(response.data.hasOwnProperty('errors')){
                     alert(response.errors.message)
                 }else{
                    console.log(response.data)
                    const result=response.data._id
                    const handleToggle=data.handleToggle
                    dispatch(billData({result,handleToggle}))
                    console.log(response.data)
                    
                 }
                 
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}

export const billData=(data)=>{
    console.log(data.result)
    return(dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${data.result}`,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                dispatch(bill(response.data))
                console.log(response.data)
                data.handleToggle()
                dispatch(updateBill(response.data))
            })
            .catch((error)=>{
                alert(error.message)
            })
    }
}
export const bill=(data)=>{
    return({
        type:"BILL",
        payload:data
    })
}
export const updateBill=(data)=>{
    return({
        type:"UPDATE_BILL_UI",
        payload:data
    })
}
export const startBillData=()=>{
    return(dispatch)=>{
        axios.get("http://dct-billing-app.herokuapp.com/api/bills",{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
             .then((response)=>{
                 //console.log(response.data)
                 dispatch(listBills(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const listBills=(data)=>{
    return({
        type:"ALL_BILLS",
        payload:data
    })
}
export const deleteBill=(data)=>{
    return(dispatch)=>{
        console.log(data)
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${data}`,{
            headers:{
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response)=>{
                console.log(response.data)
                dispatch(deleteData(response.data))
            })
            .catch((error)=>{
                alert(error.message)
            })
    }
}
export const deleteData=(data)=>{
    console.log(data)
    return({
        type:"DELETE_BILL",
        payload:data
    })
}