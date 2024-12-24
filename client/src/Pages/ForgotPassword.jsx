import React, { useState } from 'react'
import Axios from '../utils/Axios';
import SummaryApi from '../config/SummaryApi';
import { Link, useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email , setEmail] =useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("from forget pass")
        console.log(email)
        // navigate("/verify-otp");
        navigate("/verify-otp" , {state : {email}});
        try {

        
        const response= await Axios({...SummaryApi.forgot_pass , data:data})

        if (response.data.error) {
            console.log("error inside forgot pass component")
            toast.error(response.data.message);
          }
    
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/verify-otp" , state={email});
           setEmail("")
    
           
          }
        } catch (error) {
          AxiosToastError(error);
        }
    }


  return (
    <form action="" className='bg-red-200 grid justify-center  h-[300px] w-[45%] mx-auto rounded-xl mt-8 gap-3 ' onSubmit={handleSubmit}>
      <p className='mt-4 text-lg font-bold text-center underline'>Forget Password</p>
        <div className='flex flex-col gap-1   justify-center  '>
            <label htmlFor="email" className='font-semibold text-lg'>Email :</label>
        <input type="email" id='email' placeholder='enter the email' className='border-2 w-[300px] mb-0 ' value={email} onChange={(e)=> {
            setEmail(e.target.value)
        }} />

        </div>

        <button type='submit' className='border-2 bg-black text-white mb-0 w-40 h-8  mx-auto hover:bg-teal-500 rounded-lg'>Reset Password</button>
        
        <p>Already Have Account ? <Link to={"/login"} className='text-blue-100 hover:text-blue-900'>Login</Link> </p>
    </form>
  )
}

export default ForgotPassword
