import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import adminReducer from '../Reducers/adminReducer'
import usersReducer from '../Reducers/usersReducer'
import productReducer from '../Reducers/productReducer'
import billReducer from '../Reducers/billReducer'
import allBillsReducer from '../Reducers/allBillsReducer'
const Store=()=>{
    const configStore=createStore(combineReducers({
        admin:adminReducer,
        users:usersReducer,
        products:productReducer,
        bill:billReducer,
        allBills:allBillsReducer
    }),applyMiddleware(thunk))
    return configStore
}
export default Store