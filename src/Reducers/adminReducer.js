const initialState={}
const adminReducer=(state=initialState,action)=>{
    switch (action.type){
        case "ADMIN_DATA":{
            console.log(action.payload)
            return{...action.payload}
        }
        default:{
            return {...state}
        }
    }
}
export default adminReducer