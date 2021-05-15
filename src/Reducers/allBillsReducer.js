const initialState=[]
const allBills=(state=initialState,action)=>{
    switch (action.type){
        case "ALL_BILLS":{
            console.log(action.payload)
            return[...action.payload]
         }
         case "DELETE_BILL":{
             console.log(action.payload._id)
             const data=state.filter((ele)=>{
                 return(ele._id!==action.payload._id)
             })
             return [...data]
         }
         case "UPDATE_BILL_UI":{
             return([{...action.payload},...state])
         }
        default:{
            return [...state]
        }
    }
}
export default allBills