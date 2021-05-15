import React from 'react'
import ReactDOM from 'react-dom'
import Store from './createStore/billStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
const store=Store()
console.log(store.getState())
store.subscribe(()=>{
  console.log(store.getState())
})
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </Provider>

  ,document.getElementById("root")
)