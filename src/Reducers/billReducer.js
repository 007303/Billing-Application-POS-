const initialState={}
const billReducer=(state=initialState,action)=>{
    console.log(action.payload)
    switch (action.type){
        case "BILL":{
           return {...action.payload}
        }
        default :{
            return {...state}
        }
    }
}
export default billReducer