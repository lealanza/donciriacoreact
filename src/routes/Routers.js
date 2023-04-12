import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import CheckOut from '../pages/CheckOut'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProducstDetails'
import SingUp from '../pages/SingUp'
import Error from '../pages/Error'



const Routers = () => {
  return (
    <Routes>
        <Route path='/'element={<Navigate to='/home'/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='shop/:id' element={<ProductDetails/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkOut' element={<CheckOut/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='singUp' element={<SingUp/>}/>
       <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default Routers