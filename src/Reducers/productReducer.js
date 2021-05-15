const initialState=[]
const productReducer=(state=initialState,action)=>{
    switch (action.type){
        case "PRODUCT_DATA":{
            return [...action.payload]
        }
        case "PRODUCT_ENTRY":{
            return [...state,{...action.payload}]
        }
        case "DELETE_PRODUCT":{
            const data=state.filter((ele)=>{
                return(ele._id!==action.payload._id)
            })
            console.log(data)
            return [...data]
        }
        case "UPDATED_PRODUCT":{
            const data=state.filter((ele)=>{
                return(ele._id!==action.payload._id)
            })
            console.log(data)
            return [{...action.payload},...data]
        }
        default:{
            return [...state]
        }
    }
}
export default productReducer