import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {

 
 
  return (
  <section className='w-full '>
    <div className=' mx-auto  w-full bg-white grid lg:grid-cols-[250px,1fr]  p-1'>
        {/* for dashboard */}
        <div className='sticky top-0 hidden lg:block p-2 border-r'> 
            <UserMenu/>
        </div>

        {/* for content */}
        <div className='bg-white p-1 min-h-[73vh] w-full '>
           <Outlet/>
        </div>
    </div>
  </section>
  )
}

export default Dashboard
