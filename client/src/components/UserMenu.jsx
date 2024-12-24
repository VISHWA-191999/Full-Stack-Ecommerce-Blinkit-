import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../config/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { TbExternalLink } from "react-icons/tb";
import isAdmin from '../utils/isAdmin'
import { handleAddItemCart } from '../store/cartProduct'


const UserMenu = ({close}) => {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const user=useSelector((state)=> state?.user)
    const role=isAdmin(user.role)
    console.log(role) //boolean value get  ADMIN-> true OR USER ->false

    const handleLogout = async()=>{
      try {
        const response = await Axios({
           ...SummaryApi.logout
        })
        console.log("logout",response)
        if(response.data.success){
          if(close){
            close()
          }
          // dispatch(logout())
          dispatch(logout())
        dispatch(handleAddItemCart([]))
          localStorage.clear()
          toast.success(response.data.message)
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        AxiosToastError(error)
      }
 }
  return (
    <div className='flex flex-col p-1 ml-1 gap-1 sticky top-20 '>
     <h2 className='font-semibold text-blue-800 text-center underline '>My Account</h2>
     <div className='flex gap-2 items-center'>
     <h3 className='font-bold text-2xl text-cyan-700'>{user.name} <sup className='font-semibold text-sm text-black'>{role && "Admin"}</sup> </h3>
      <TbExternalLink 
      onClick={
        ()=>{
        navigate('dashboard/profile') 
        close()}
        } size={15} 
        className='hover:text-yellow-200 hover:cursor-pointer'/>
     </div>
     <Divider/>
    <div className='grid font-semibold text-gray-800 text-sm gap-2 p-2'>
      {
        role &&
        <Link to={"/dashboard/category"} onClick={close} className='hover:text-blue-700 hover:bg-orange-300'>Category</Link>
      }
      {
        role &&
      <Link to={"/dashboard/sub-category"} onClick={close} className='hover:text-blue-700 hover:bg-orange-300'>Sub Category</Link>
      }
      {
        role && 
    <Link to={"/dashboard/upload-product"}  onClick={close} className='hover:text-blue-700 hover:bg-orange-300'>Upload Product</Link>
      }
      {
        role &&
    <Link to={"/dashboard/products"} onClick={close} className='hover:text-blue-700 hover:bg-orange-300'>Product</Link>
      }
    <Link to={"/dashboard/myorders"} onClick={close} className='hover:text-blue-700 hover:bg-orange-300'>My Orders</Link>
    <Link to={"/dashboard/address"} onClick={close}  className='hover:text-blue-700 hover:bg-orange-300'>Saved Address</Link>
    <button onClick={handleLogout} className=' bg-white text-blue-500 p-1 hover:bg-orange-300'>Log Out</button>
    </div>
    </div>
  )
}

export default UserMenu
