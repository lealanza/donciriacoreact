import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Shop from '../pages/Shop'
import CheckOut from '../pages/CheckOut'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProducstDetails'
import SingUp from '../pages/SingUp'
import Error from '../pages/Error'
import ProtectedRoutes from './ProtectedRoutes'
import Profile from '../pages/Profile'
import ResetPassword from '../pages/ResetPassword'
import Verified from '../pages/Verified.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import AllOrders from '../admin/AllOrders'
import Users from '../admin/Users'



const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='home' element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='shop/:id' element={<ProductDetails />} />
      <Route path='cart' element={<Cart />} />
      <Route path='login' element={<Login />} />
      <Route path='resetPassword' element={<ResetPassword />} />
      <Route path='singup' element={<SingUp />} />
      <Route path='verified' element={<Verified />} />
      <Route path='/*' element={<ProtectedRoutes/>}>
        <Route path='checkOut'element={ <CheckOut />}/>
        <Route path='dashboard' element={<Dashboard /> } />
        <Route path='dashboard/orders' element={<AllOrders /> } />
        <Route path='dashboard/users' element={<Users /> } />

        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default Routers