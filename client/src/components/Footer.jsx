import React from 'react'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa"
const Footer = () => {
  return (
   <footer className='sticky bottom-0 z-20  bg-red-200' >
     <hr className='mt-4' />
    <div className=' w-full px-2 flex flex-col text-center md:flex-row md:justify-between lg:flex-row lg:justify-between '>
       
        <p className='mt-3  text-md '>© All Rights Reserved 2024</p>
       

        <div className='flex justify-center gap-5 items-center text-2xl  '>
            <a href="" className='hover:text-secondary hover:bg-primary-light'> <FaFacebook/> </a>
            <a href=""><FaInstagramSquare className='hover:text-secondary hover:bg-primary-light'/></a>
            <a href='' className='hover:text-secondary hover:bg-primary-light' ><FaLinkedin/></a>
        </div>
    </div>
   </footer>
  )
}

export default Footer
