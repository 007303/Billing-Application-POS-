import React,{useState,useEffect,useMemo} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteProduct} from  '../Actions/billingAction'
import {Modal,Button} from 'react-bootstrap'
import {updateProduct} from '../Actions/billingAction'
const ProductList=(props)=>{
    const [datan,setData]=useState([])
    const [show,setShow]=useState(false)
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [id,setId]=useState([])
    const [search,setSearch]=useState("")
    const dispatch=useDispatch()
    const prod=useSelector((state)=>{
        return(state.products)
    })
    console.log(prod)
    useEffect(()=>{
        setData(prod)
    },[prod])

    const handleDelete=(id)=>{
        console.log(id)
        dispatch(deleteProduct(id))
    }
    const handleButton=(data)=>{
        console.log(data)
        setName(data.name)
        setPrice(data.price)
        setId(data._id)
        handleToggle()
    }
    const handleName=(e)=>{
        setName(e.target.value)
    }
    const handlePrice=(e)=>{
        setPrice(e.target.value)
    }
    const handleToggle=()=>{
        setShow(!show)
    }
    const handleSearch=(e)=>{
        setSearch(e.target.value)
        console.log(datan)
        const result=datan.filter((ele)=>{
            return(ele.name.toLowerCase().includes(e.target.value.toLowerCase()))
        })
        console.log(result)
        setData(result)
        if(e.target.value===""){
            setData(prod)
            console.log(prod)
        }
    }
    const handleChanges=()=>{
        const data={
            name:name,
            price:price
        }
        console.log(data)
        console.log(id)
        dispatch(updateProduct({data,id}))
        handleToggle()
    }
    return(
        <div class="container">
            <div class="row">
            <div class="col-md-7">
            <h2>Products</h2>
            </div>
            <div class="col-md-5">
            <input type="text" value={search} onChange={handleSearch} class="form-control" placeholder="Search"/>
            </div>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datan.map((ele,i)=>{
                     return(
                         <tr >
                             <td  scope="row">{i}</td>
                            <td>{ele.name}</td>
                            <td>{ele.price}</td>
                            <td onClick={()=>{handleButton(ele)}}  ><input type="button" value="Edit" class="btn btn-primary"/></td>
                            <td onClick={()=>{handleDelete(ele._id)}}><input type="button" value="Delete" class="btn btn-outline-primary"/></td>
                         </tr>
                     )    
                    })}
                </tbody>
            </table>
            <Modal show={show}>
                <Modal.Header>Update product Info</Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                            <label>Product Name</label>
                            <input type="text" value={name} onChange={handleName}/>
                            </div>
                            <div class="col-md-6">
                            <label>Price</label>
                        <input type="text" value={price} onChange={handlePrice}/>
                        </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleChanges}>Save Changes</Button>
                    <Button onClick={handleToggle}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}
export default ProductList