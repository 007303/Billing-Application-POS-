const initialState=[]
const usersReducer=(state=initialState,action)=>{
    switch (action.type){
        case "USERS_DATA":{
            return [...action.payload]
        }
        case "CUSTOMER_ENTRY":{
            return [...state,{...action.payload}]
        }
        case "DELETE_CUSTOMER":{
            const data=state.filter((ele)=>{
                return(ele._id!==action.payload._id)
            })
            console.log(data)
            return [...data]
        }
        case "UPDATED_CUSTOMER":{
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
export default usersReducer